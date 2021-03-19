const Utils = module.exports;

const moment = require('moment-timezone');

Utils.getToday = () => moment().tz('America/Argentina/Buenos_Aires').format();
