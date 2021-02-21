const api = require("binance");
// Load .env into process.env
require("dotenv").config();
const cryptoToWatch = ["BTCUSDT", "BNBBTC"];

// Init Binance Rest API
const bRest = new api.BinanceRest({
  key: process.env.api_key,
  secret: process.env.api_secret,
  timeout: 15000,
  recvWindow: 10000,
  disableBeautification: false,
  handleDrift: false,
  baseUrl: "https://api.binance.com",
  requestOptions: {},
});

async function initialize() {
  let account = await bRest.account();
  if (!account.permissions.includes("SPOT"))
    return console.log("Please set the right permissions to trade on binance");
}

initialize();
// For later use in a webinterface
/*
const binanceWS = new api.BinanceWS(true);
const streams = binanceWS.streams;

// Register market event listeners for all crypto pairs to observe
if (cryptoToWatch.length > 0) {
  for (let i = 0; i < cryptoToWatch.length; i++) {
    const pair = cryptoToWatch[i];
    binanceWS.onCombinedStream(
      [
        streams.depth(pair),
        streams.kline(pair, "5m"),
        streams.trade(pair),
        streams.ticker(pair),
      ],
      (streamEvent) => {
        switch (streamEvent.stream) {
          case streams.depth(pair):
            console.log(
              pair,
              ": Depth event, update order book\n",
              streamEvent.data
            );
            break;
          case streams.kline(pair, "5m"):
            console.log(
              pair,
              ": Kline event, update 5m candle display\n",
              streamEvent.data
            );
            break;
          case streams.trade(pair):
            console.log(
              pair,
              ": Trade event, update trade history\n",
              streamEvent.data
            );
            break;
          case streams.ticker(pair):
            console.log(
              pair,
              ": Ticker event, update market stats\n",
              streamEvent.data
            );
            break;
        }
      }
    );
  }
}
*/
