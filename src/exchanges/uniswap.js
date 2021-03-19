const uniswap = module.exports;

const web3 = require('../protocol');
const UNISWAP_FACTORY_ABI = require('../abis/uniswap/factory.json');
const UNISWAP_EXCHANGE_ABI = require('../abis/uniswap/exchange.json');
const { UNISWAP_FACTORY_ADDRESS } = require('../utils/Constants');
const assets = require('../assets');

uniswap.name = 'uniswap';

uniswap.factoryContract = new web3.eth.Contract(UNISWAP_FACTORY_ABI, UNISWAP_FACTORY_ADDRESS);

uniswap.fetch = async (inputToken, outputToken, amount) => {
  const inputExchangeAddress = await uniswap.factoryContract.methods.getExchange(assets[inputToken].address).call();
  const inputUniswap = new web3.eth.Contract(UNISWAP_EXCHANGE_ABI, inputExchangeAddress);

  const ethAmount = await inputUniswap.methods.getTokenToEthInputPrice(amount).call();

  const outputExchangeAddress = await uniswap.factoryContract.methods.getExchange(assets[outputToken].address).call();
  const outputUniswap = new web3.eth.Contract(UNISWAP_EXCHANGE_ABI, outputExchangeAddress);

  result = await outputUniswap.methods.getEthToTokenInputPrice(ethAmount).call();

  return result;
};
