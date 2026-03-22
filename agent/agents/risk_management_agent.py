from utils import get_response_llm, create_client
import json


def risk_management_agent(messages):

    client=create_client()

    system_prompt="""
You are a crypto trading risk expert.

Evaluate the proposed trade and suggest improvements.

Output JSON

{
"message":""
}
"""

    input_message=[{"role":"system","content":system_prompt}]+messages[-3:]

    response=get_response_llm(client,input_message)

    try:
        output=json.loads(response)
    except:
        output={"message":"Risk evaluation unavailable"}

    return {
        "role":"assistant",
        "content":output["message"],
        "agent":"risk_management_agent"
    }