const _ = require('lodash');
const Dimension = require('../models/Dimension');
const constants = require('../constants')

function getWallThickness(agent) {
    let whatNext = constants.whatNextArray[Math.floor(Math.random() * constants.whatNextArray.length)];
    let sizeOne = _.isArray(agent.parameters.sizeOne) && !_.isEmpty(agent.parameters.sizeOne) ? agent.parameters.sizeOne[0] :  agent.parameters.sizeOne;
    let scheduleOne = _.isArray(agent.parameters.scheduleOne) && !_.isEmpty(agent.parameters.scheduleOne) ? agent.parameters.scheduleOne[0] :  agent.parameters.scheduleOne;
    let item = _.isArray(agent.parameters.item) && !_.isEmpty(agent.parameters.item) ? agent.parameters.item[0] :  agent.parameters.item;
    switch (item) {
        case 'pipe':
        case 'cap':
        case 'elbow':
        case 'pipe':
        case 'tee':
            return Dimension.findOne({
                item: item,
                ['sizeOne.tags']: sizeOne,
                ['scheduleOne.tags']: scheduleOne
            }, function (err, res) {
                if (err || !res) {
                    return (
                        agent.add(`Sorry. I could not find the wall thickness for this item.`),
                        agent.add(`${whatNext}`)
                    );
                } else {
                    let wt = res.dimensions.wallThicknessRun;
                    return (
                        agent.add(`The ${wt.display} of a ${sizeOne} ${item} ${scheduleOne} is ${wt.metric.value} ${wt.metric.uom}.`),
                        agent.add(`${whatNext}`)
                    );
                }
            });
        case 'reducer':
        default: 
            return (
                agent.add(`Sorry, I havn't been trained for ${item} yet.`),
                agent.add(`${whatNext}`)
            );
    }
}

module.exports = getWallThickness;