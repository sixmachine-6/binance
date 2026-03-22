from utils import get_response_llm, create_client
from data.market_data import get_market_data
import json


def trade_signal_agent(messages,symbol):

    client=create_client()

    market=get_market_data(symbol)

    market_context=f"""
Symbol: {market['symbol']}
Price: {market['price']}
RSI: {market['rsi']}
Support: {market['support']}
Resistance: {market['resistance']}
"""

    system_prompt="""
You are a crypto trading strategist.

Generate trade signal.

Rules
Risk reward minimum 1:2

Output JSON

{
"decision":"BUY or SELL or HOLD",
"entry_price":"",
"take_profit":"",
"stop_loss":"",
"message":""
}
"""

    input_message=[
        {"role":"system","content":system_prompt},
        {"role":"system","content":market_context}
    ]+messages[-2:]

    response=get_response_llm(client,input_message)

    try:
        output=json.loads(response)
    except:
        output={
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