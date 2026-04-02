from utils import get_response_llm, create_client
import json
import re


def extract_json(text):
    try:
        match = re.search(r"\{.*\}", text, re.DOTALL)
        if match:
            return json.loads(match.group())
    except Exception:
        pass
    return None


def risk_management_agent(messages):

    client = create_client()

    system_prompt = """
You are a professional crypto trading risk manager.

Your job is to evaluate a proposed trade and assess its risk.

When evaluating the trade, consider these factors:

1. Risk-Reward Ratio
   - Check if reward is at least 2x the risk.

2. Stop Loss Placement
   - Ensure stop loss is placed near support/resistance.
   - Stop loss should protect from large losses.

3. Market Volatility
   - High volatility increases risk.

4. Position Risk
   - Suggested risk per trade should not exceed 1–2% of capital.

5. Trade Quality
   - If entry is too close to resistance, risk is higher.

Based on these factors, provide risk feedback.

Return ONLY JSON.

{
"message": "short explanation of the risk and suggestions to improve the trade"
}
"""

    input_message = [
        {"role": "system", "content": system_prompt}
    ] + messages[-3:]

    response = get_response_llm(client, input_message)

    print("Risk agent raw response:", response)

    output = extract_json(response)

    # safe fallback
    if not output:
        output = {}

    risk_message = (
        output.get("message")
        or output.get("reason")
        or output.get("analysis")
        or response
    )

    return {
        "role": "assistant",
        "content": risk_message,
        "agent": "risk_management_agent"
    }