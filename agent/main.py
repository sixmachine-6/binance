from fastapi import FastAPI
from typing import List, Dict

from agents import (
    guard_other_agents,
    classify_response_agent,
    market_analysis_agent,
    trade_signal_agent,
    risk_management_agent,
    judge_agent,
    general_crypto_agent
)

from utils.symbol_extractor import extract_symbol

app = FastAPI()


@app.post("/chat")
async def chat_endpoint(messages: List[Dict]):

    # 1 Guard
    guard = guard_other_agents(messages)

    if guard["decision"] == "not allowed":
        return {"messages":[guard]}

    messages.append(guard)

    # 2 Classification
    classification = classify_response_agent(messages)
    messages.append(classification)

    decision = classification["decision"]

    # 3 Routing

    if decision == "general_crypto_agent":

        response = general_crypto_agent(messages)
        messages.append(response)

        return {"messages":messages}

    if decision == "risk_management_agent":

        risk = risk_management_agent(messages)
        messages.append(risk)

        return {"messages":messages}

    # 4 If market or trade → need symbol
    symbol = extract_symbol(messages)

    analysis = market_analysis_agent(messages,symbol)
    messages.append(analysis)

    signal = trade_signal_agent(messages,symbol)
    messages.append(signal)

    risk = risk_management_agent(messages)
    messages.append(risk)

    final = judge_agent(messages)
    messages.append(final)

    return {"messages":messages}