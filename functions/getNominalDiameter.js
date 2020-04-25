const _ = require('lodash');
const Dimension = require('../models/Dimension');
const constants = require('../constants')

function getNominalDiameter(agent) {
    let whatNext = constants.whatNextArray[Math.floor(Math.random() * constants.whatNextArray.length)];
    let sizeOne = _.isArray(agent.parameters.sizeOne) && !_.isEmpty(agent.parameters.sizeOne) ? agent.parameters.sizeOne[0] :  agent.parameters.sizeOne;
    let item = _.isArray(agent.parameters.item) && !_.isEmpty(agent.parameters.item) ? agent.parameters.item[0] :  agent.parameters.item;
    switch (item) {
        case 'pipe':
            return Dimension.findOne({
                item: item,
                ['sizeOne.tags']: sizeOne
            }, function (err, res) {
                if (err || !res) {
                    return agent.add(`Sorry. I could not find the nominal diameter for this item. ${whatNext}`);
                } else {
                    return agent.add(`The nominal diameter of a ${sizeOne} ${item} is ${res.sizeOne.dn}. ${whatNext}`);
                }
            });
        default: agent.add(`Sorry, I havn't been trained for ${item} yet. ${whatNext}`);
    }
}

module.exports = getNominalDiameter;