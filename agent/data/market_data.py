import requests
import pandas as pd


def get_market_data(symbol):

    url = "https://api.binance.com/api/v3/klines"

    params = {
        "symbol": symbol,
        "interval": "1h",
        "limit": 100
    }

    r = requests.get(url, params=params)
    data = r.json()

    df = pd.DataFrame(data)

    df = df.iloc[:, :6]
    df.columns = ["time","open","high","low","close","volume"]

    df["close"] = df["close"].astype(float)
    df["high"] = df["high"].astype(float)
    df["low"] = df["low"].astype(float)

    price = df["close"].iloc[-1]

    support = df["low"].min()
    resistance = df["high"].max()

    rsi = calculate_rsi(df["close"])

    return {
        "symbol": symbol,
        "price": round(price,2),
        "support": round(support,2),
        "resistance": round(resistance,2),
        "rsi": round(rsi,2)
    }


def calculate_rsi(series, period=14):

    delta = series.diff()

    gain = delta.clip(lower=0)
    loss = -delta.clip(upper=0)

    avg_gain = gain.rolling(period).mean()
    avg_loss = loss.rolling(period).mean()

    rs = avg_gain / avg_loss

    rsi = 100 - (100/(1+rs))

    return rsi.iloc[-1]