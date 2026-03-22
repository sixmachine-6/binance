from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict

from agents.guard_agent import guard_other_agents
from agents.classification_agent import classify_response_agent
from agents.market_analysis_agent import market_analysis_agent
from agents.trade_signal_agent import trade_signal_agent
from agents.risk_management_agent import risk_management_agent
from agents.judge_agent import judge_agent
from agents.general_crypto_agent import general_crypto_agent

from utils.symbol_extractor import extract_symbol

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/chat")
async def chat_endpoint(messages: List[Dict]):

    print("Incoming messages:", messages)

    last_user_message = messages[-1]

    # Guard agent
    guard = guard_other_agents([last_user_message])

    if guard["decision"] == "not allowed":
        return {"messages": [guard]}

    # Classification
    classification = classify_response_agent([last_user_message])

    decision = classification["decision"]

    if decision == "general_crypto_agent":

        response = general_crypto_agent([last_user_message])

        return {"messages": [response]}

    if decision == "risk_management_agent":

        risk = risk_management_agent([last_user_message])

        return {"messages": [risk]}

    # Extract symbol
    symbol = extract_symbol(messages)

    print("Detected Symbol:", symbol)

    # Run agents
    analysis = market_analysis_agent([last_user_message], symbol)

    signal = trade_signal_agent([last_user_message], symbol)

    risk = risk_management_agent([last_user_message])

    final = judge_agent([last_user_message, signal])

    # IMPORTANT: return them
    return {
        "messages": [
            analysis,
            signal,
            risk,
            final
        ]
    }