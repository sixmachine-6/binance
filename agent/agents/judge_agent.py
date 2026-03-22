from utils import get_response_llm, create_client
import json


def judge_agent(messages):

    client=create_client()

    system_prompt="""
You are the final decision maker.

Evaluate analysis, signal and risk advice.

Output final trade.

JSON format:

{
"decision":"",
"entry_price":"",
"take_profit":"",
"stop_loss":"",
"message":""
}
"""

    input_message=[{"role":"system","content":system_prompt}]+messages[-5:]

    response=get_response_llm(client,input_message)

    try:
        output=json.loads(response)
    except:
        output={"decision":"HOLD","message":"No final decision"}

    return {
        "role":"assistant",
        "content":output["message"],
        "decision":output.get("decision"),
        "entry_price":output.get("entry_price"),
        "take_profit":output.get("take_profit"),
        "stop_loss":output.get("stop_loss"),
        "agent":"judge_agent"
    }