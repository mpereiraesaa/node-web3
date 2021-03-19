require('dotenv').config()
require('./protocol');

const eventEmitter = require('./eventsManager');
const { PROFITABLE_ARBITRAGE_FOUND } = require('./utils/Events');
const { getToday } = require('./utils/Utils');
const { DAI, WETH } = require('./assets');
const onesplit = require('./exchanges/onesplit');
const uniswap = require('./exchanges/uniswap');

eventEmitter.on(PROFITABLE_ARBITRAGE_FOUND, () => {
  console.log('PROFITABLE ARBITRAGE FOUND');
});

async function checkMarkets() {
  console.log(`Fetching market data @ ${getToday()} ...\n`)
  try {
    const amount = '100';
    const pairs = [[WETH, DAI]];
    const exchanges = [uniswap, onesplit];

    const exchangePromises = exchanges.map(async (exchange) => {
      const fromToken = pairs[0][0].symbol;
      const toToken = pairs[0][1].symbol;
      const outputAmount = await exchange.fetch(fromToken, toToken, amount);
      return { from: fromToken, to: toToken, outputAmount, exchange: exchange.name };
    });

    const results = await Promise.all(exchangePromises);

    results.forEach(({ from, to, outputAmount, exchange }) => {
      console.log(`${exchange}: ${amount} ${from} -> ${to} results in ${outputAmount}`);
    });
  } catch (error) {
    console.error(error)
    return
  }
}

const POLLING_INTERVAL = process.env.POLLING_INTERVAL || 3000 // 3 seconds
setInterval(async () => { await checkMarkets() }, POLLING_INTERVAL)
