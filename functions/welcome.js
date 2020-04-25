const _ = require('lodash');
const constants = require('../constants');

function welcome(agent) {
    let goodDay = constants.goodDayArray[Math.floor(Math.random() * constants.goodDayArray.length)];
    agent.add(`${goodDay}`);
}

module.exports = welcome;