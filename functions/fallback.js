const _ = require('lodash');
const constants = require('../constants');

function fallback(agent) {
    let dontKnow = constants.dontKnowArray[Math.floor(Math.random() * constants.dontKnowArray.length)];
    let whatNext = constants.whatNextArray[Math.floor(Math.random() * constants.whatNextArray.length)];
    agent.add(`${dontKnow} ${whatNext}`);
}

module.exports = fallback;