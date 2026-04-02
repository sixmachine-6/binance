from openai import OpenAI


def get_response_llm(client, messages, temperature=0.2):

    input_messages = []

    for message in messages:

        role = message.get("role")
        content = message.get("content")

        if role == "assistant":
            continue

        input_messages.append({
            "role": role,
            "content": content
        })

    response = client.chat.completions.create(
        model="ai/llama3.2:3B-Q4_0",
        messages=input_messages,
        temperature=temperature,
        top_p=0.8,
        max_tokens=2000,
    )

    return response.choices[0].message.content


def create_client():

    return OpenAI(
        base_url="http://localhost:12434/engines/llama.cpp/v1/",
        api_key="anything"
    )