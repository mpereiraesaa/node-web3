const web3 = require('web3');
const { WEB3_PROVIDER_URL } = process.env;

module.exports = new web3(WEB3_PROVIDER_URL);
