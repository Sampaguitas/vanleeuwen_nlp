const _ = require('lodash');
const Dimension = require('../models/Dimension');
const constants = require('../constants')

function getOutsideDiameter(agent) {
    let whatNext = constants.whatNextArray[Math.floor(Math.random() * constants.whatNextArray.length)];
    let item = _.isArray(agent.parameters.item) && !_.isEmpty(agent.parameters.item) ? agent.parameters.item[0] :  agent.parameters.item;
    let sizeOne = _.isArray(agent.parameters.sizeOne) && !_.isEmpty(agent.parameters.sizeOne) ? agent.parameters.sizeOne[0] :  agent.parameters.sizeOne;
    let sizeTwo = _.isArray(agent.parameters.sizeTwo) && !_.isEmpty(agent.parameters.sizeTwo) ? agent.parameters.sizeTwo[0] :  agent.parameters.sizeTwo;
    switch (item) {
        case 'cap':
        case 'elbow':
        case 'pipe':
        case 'tee':
            return Dimension.findOne({
                item: item,
                ['sizeOne.tags']: sizeOne
            }, function (err, res) {
                if (err || !res) {
                    return (
                        agent.add(`Sorry. I could not find the outside diameter for this item.`),
                        agent.add(`${whatNext}`)
                    );
                } else {
                    let od = res.dimensions.outsideDiameterRun;
                    return (
                        agent.add(`The ${od.display} of a ${sizeOne} ${item} is ${od.metric.value} ${od.metric.uom}.`),
                        agent.add(`${whatNext}`)
                    );
                }
            });
        case 'reducer':
            if (!sizeTwo) {
                return Dimension.findOne({
                    item: item,
                    ['sizeOne.tags']: sizeOne,
                }, function (err, res) {
                    if (err || !res) {
                        return (
                            agent.add(`Sorry. I could not find the outside diameter for this item.`),
                            agent.add(`${whatNext}`)
                        );
                    } else {
                        let od = res.dimensions.outsideDiameterRun;
                        return (
                            agent.add(`The ${od.display} of a ${sizeOne} ${item} is ${od.metric.value} ${od.metric.uom},`),
                            agent.add(`${whatNext}`)
                        );
                    }
                });
            } else {
                return Dimension.findOne({
                    item: item,
                    ['sizeOne.tags']: sizeOne,
                    ['sizeTwo.tags']: sizeTwo,
                }, function (err, res) {
                    if (err || !res) {
                        return (
                            agent.add(`Sorry. I could not find the outside diameter for this item.`),
                            agent.add(`${whatNext}`)
                        );
                    } else {
                        let odOne = res.dimensions.outsideDiameterRun;
                        let odTwo = res.dimensions.outsideDiameterOutlet;
                        return (
                            agent.add(`The ${odOne.display} of a ${sizeOne} by ${sizeTwo} ${item} is ${odOne.metric.value} ${odOne.metric.uom},`),
                            agent.add(`The ${odTwo.display} of a ${sizeOne} by ${sizeTwo} ${item} is ${odTwo.metric.value} ${odTwo.metric.uom},`),
                            agent.add(`${whatNext}`)
                        );
                    }
                });
            }
        default: 
            return (
                agent.add(`Sorry, I havn't been trained for ${item} yet.`),
                agent.add(`${whatNext}`)
            );
    }
}

module.exports = getOutsideDiameter;

