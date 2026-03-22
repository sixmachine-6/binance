from utils import get_response_llm, create_client
import json
import re


def extract_json(text):
    try:
        match = re.search(r"\{.*\}", text, re.DOTALL)
        if match:
            return json.loads(match.group())
    except:
        pass
    return None


def judge_agent(messages):

    client = create_client()

    system_prompt = """
You are the FINAL trading decision engine in a multi-agent crypto trading system.

You receive analysis from several agents:
- market analysis agent
- signal generation agent
- risk management agent

Your task is to combine their insights and produce the final trading decision.

Follow these rules strictly:

1. If the analysis and signals strongly agree → choose BUY or SELL.
2. If signals conflict or confidence is weak → choose HOLD.
3. Ensure the trade follows good risk management:
   - Stop loss must always limit downside risk.
   - Take profit should provide a favorable risk/reward ratio.
4. Never fabricate data that was not mentioned in the analysis.
5. If entry price is unclear, return HOLD.

Return ONLY valid JSON with no explanations, no markdown, and no extra text.

JSON format:

{
  "decision": "BUY | SELL | HOLD",
  "entry_price": number or null,
  "take_profit": number or null,
  "stop_loss": number or null,
  "message": "Short explanation of the decision"
}
"""

    input_message = [{"role": "system", "content": system_prompt}] + messages[-5:]

    response = get_response_llm(client, input_message)

    # extract JSON safely
    output = extract_json(response)
    print(output)
    if not output:
        output = {
            "decision": "HOLD",
            "entry_price": None,
            "take_profit": None,
            "stop_loss": None,
            "message": "No final decision"
        }

    return {
        "role": "assistant",
        "content": output.get("message"),
        "decision": output.get("decision"),
        "entry_price": output.get("entry_price"),
        "take_profit": output.get("take_profit"),
        "stop_loss": output.get("stop_loss"),
        "agent": "judge_agent"
    }