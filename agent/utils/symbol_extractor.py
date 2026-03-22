import re

DEFAULT_SYMBOL = "BTCUSDT"

def extract_symbol(messages):

    text = messages[-1]["content"].upper()

    patterns = [
        r"BTCUSDT",
        r"ETHUSDT",
        r"SOLUSDT",
        r"BNBUSDT",
        r"ADAUSDT",
        r"XRPUSDT"
    ]

    for p in patterns:
        if p in text:
            return p

    # handle simple names
    simple = {
        "BTC": "BTCUSDT",
        "ETH": "ETHUSDT",
        "SOL": "SOLUSDT",
        "BNB": "BNBUSDT",
        "ADA": "ADAUSDT",
        "XRP": "XRPUSDT"
    }

    for key in simple:
        if key in text:
            return simple[key]

    return DEFAULT_SYMBOL