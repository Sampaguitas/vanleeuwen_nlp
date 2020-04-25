const _ = require('lodash');
const Dimension = require('../models/Dimension');
const constants = require('../constants')

function getNominalDiameter(agent) {
    let whatNext = constants.whatNextArray[Math.floor(Math.random() * constants.whatNextArray.length)];
    let sizeOne = _.isArray(agent.parameters.sizeOne) && !_.isEmpty(agent.parameters.sizeOne) ? agent.parameters.sizeOne[0] :  agent.parameters.sizeOne;
    let item = _.isArray(agent.parameters.item) && !_.isEmpty(agent.parameters.item) ? agent.parameters.item[0] :  agent.parameters.item;
    switch (item) {
        case 'cap':
        case 'elbow':
        case 'pipe':
        case 'reducer':
        case 'tee':
            return Dimension.findOne({
                item: item,
                ['sizeOne.tags']: sizeOne
            }, function (err, res) {
                if (err || !res) {
                    return (
                        agent.add(`Sorry. I could not find the nominal diameter for this item.`),
                        agent.add(`${whatNext}`)
                    );
                } else {
                    return (
                        agent.add(`The nominal diameter of a ${sizeOne} ${item} is ${res.sizeOne.dn}.`),
                        agent.add(`${whatNext}`)
                    );
                }
            });
        default: 
            return (
                agent.add(`Sorry, I havn't been trained for ${item} yet.`),
                agent.add(`${whatNext}`)
            );
    }
}

module.exports = getNominalDiameter;