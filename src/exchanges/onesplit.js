const OneSplit = module.exports;

const ONE_SPLIT_ABI = require('../abis/oneSplit/contract.json');
const { ONE_SPLIT_ADDRESS } = require('../utils/Constants');
const web3 = require('../protocol');
const assets = require('../assets');

const ONE_SPLIT_PARTS = 10;
const ONE_SPLIT_FLAGS = 0;

OneSplit.name = 'onesplit';

OneSplit.contract = new web3.eth.Contract(ONE_SPLIT_ABI, ONE_SPLIT_ADDRESS);

OneSplit.fetch = async (inputToken, outputToken, amount) => {
  const result = await OneSplit.contract.methods.getExpectedReturn(
    assets[inputToken].address,
    assets[outputToken].address,
    amount,
    ONE_SPLIT_PARTS,
    ONE_SPLIT_FLAGS,
  ).call();

  return result.returnAmount;
};
