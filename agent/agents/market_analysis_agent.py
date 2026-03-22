from utils import get_response_llm, create_client
from data.market_data import get_market_data
import json


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
Return short analysis.

Output JSON:

{
"analysis": ""
}
"""

    input_message = [
        {"role":"system","content":system_prompt},
        {"role":"system","content":market_context}
    ] + messages[-2:]

    response = get_response_llm(client,input_message)

    try:
        output=json.loads(response)
    except:
        output={"analysis":"Unable to analyze"}

    return {
        "role":"assistant",
        "content":output["analysis"],
        "agent":"market_analysis_agent"
    }