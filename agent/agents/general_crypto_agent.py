from utils import get_response_llm, create_client
import json


def general_crypto_agent(messages):

    client = create_client()

    system_prompt = """
You are a cryptocurrency expert.

Answer general crypto questions clearly.

Topics:
- blockchain
- trading concepts
- indicators
- exchanges
- crypto basics

Output JSON:

{
"message":""
}
"""

    input_message = [{"role":"system","content":system_prompt}] + messages[-3:]

    response = get_response_llm(client,input_message)

    try:
        output=json.loads(response)
    except:
        output={"message":"Unable to answer"}

    return {
        "role":"assistant",
        "content":output["message"],
        "agent":"general_crypto_agent"
    }