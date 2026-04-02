from utils import get_response_llm, create_client
from utils.json_parser import extract_json
from data.market_data import get_market_data

def trade_signal_agent(messages, symbol):

    client = create_client()

    market = get_market_data(symbol)

    market_context = f"""
Symbol: {market['symbol']}
Price: {market['price']}
RSI: {market['rsi']}
Support: {market['support']}
Resistance: {market['resistance']}
"""

    system_prompt = """
Generate crypto trade signal.

Return ONLY JSON:

{
"decision":"BUY or SELL or HOLD",
"entry_price":"",
"take_profit":"",
"stop_loss":"",
"message":""
}
"""

    input_message = [
        {"role":"system","content":system_prompt},
        {"role":"system","content":market_context}
    ] + messages

    response = get_response_llm(client,input_message)

    output = extract_json(response)
    print("Trade signal response:", output)
    if not output:
        output = {
            "decision":"HOLD",
            "message":"No signal"
        }

    return {
        "role":"assistant",
        "content":output.get("message"),
        "decision":output.get("decision"),
        "entry_price":output.get("entry_price"),
        "take_profit":output.get("take_profit"),
        "stop_loss":output.get("stop_loss"),
        "agent":"trade_signal_agent"
    }