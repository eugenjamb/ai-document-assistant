from fastapi import FastAPI
import yfinance as yf

app = FastAPI(title="AI Stock Predictor API")

@app.get("/")
def home():
    return {"message": "Welcome to AI Stock Predictor API"}

@app.get("/stock/{symbol}")
def get_stock_data(symbol: str):
    data = yf.download(symbol, period="5d", interval="1d")
    latest = data.tail(1).to_dict(orient="records")[0]
    return {"symbol": symbol, "latest_data": latest}
