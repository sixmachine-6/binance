from utils import get_response_llm, create_client
from data.market_data import get_market_data
import json
import re


def extract_json(text):
    """
    Extract JSON object from LLM response safely
    """
    try:
        match = re.search(r"\{.*\}", text, re.DOTALL)
        if match:
            return json.loads(match.group())
    except Exception:
        pass

    return None


def market_analysis_agent(messages, symbol):

    client = create_client()

    market = get_market_data(symbol)

    market_context = f"""
Market Data
Symbol: {market['symbol']}
Price: {market['price']}
RSI: {market['rsi']}
Support: {market['support']}
Resistance: {market['resistance']}
"""

    system_prompt = """
You are a cryptocurrency market analyst.

Analyze the market conditions using the given data.
Discuss trend, RSI condition and price location.

Return ONLY JSON.

{
"analysis": ""
}
"""

    input_message = [
        {"role": "system", "content": system_prompt},
        {"role": "system", "content": market_context}
    ] + messages[-2:]

    response = get_response_llm(client, input_message)

    print("Market analysis raw response:", response)

    output = extract_json(response)

    if not output:
        output = {}

# Try multiple possible keys
    analysis_text = (
    output.get("analysis")
    or output.get("reason")
    or output.get("message")
    or response
)

    return {
    "role": "assistant",
    "content": analysis_text,
    "agent": "market_analysis_agent"
}