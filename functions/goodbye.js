const _ = require('lodash');
const constants = require('../constants');

function goodbye(agent) {
    let seeYou = constants.seeYouArray[Math.floor(Math.random() * constants.seeYouArray.length)];
    agent.end(`${seeYou}`);
}

module.exports = goodbye;