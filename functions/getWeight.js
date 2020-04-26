const _ = require('lodash');
const Dimension = require('../models/Dimension');
const constants = require('../constants');

function getWeight(agent) {
    let whatNext = constants.whatNextArray[Math.floor(Math.random() * constants.whatNextArray.length)];
    let item = getParam('item', 'weight', agent);
    let sizeOne = getParam('sizeOne', 'weight', agent);
    let scheduleOne = getParam('scheduleOne', 'weight', agent);
    let angle = getParam('angle', 'weight', agent);
    let radius = getParam('radius', 'weight', agent);
    switch (item) {
        case 'pipe':
        case 'cap':
        case 'reducer':
        case 'tee':
            return Dimension.findOne({
                item: item,
                ['sizeOne.tags']: sizeOne,
                ['scheduleOne.tags']: scheduleOne
            }, function (err, res) {
                if (err || !res) {
                    return (
                        agent.add(`Sorry. I could not find the weight for this item.`),
                        agent.add(`${whatNext}`)
                    );
                } else {
                    let { weight } = res.dimensions;
                    return (
                        agent.add(`the ${weight.display} of a ${sizeOne} ${item} ${scheduleOne} is ${weight.metric.value} ${weight.metric.uom}.`),
                        agent.add(`${whatNext}`)
                    );
                }
            });
        case 'elbow':
            if (!angle) { 
                agent.context.set({
                    'name': `weight_dialog_context`,
                    'lifespan': 5,
                    'parameters': {'item': item, 'sizeOne': sizeOne, 'scheduleOne': scheduleOne, 'angle': angle, 'radius': radius }
                });
                return agent.add('What is the angle?');
            } else if (!radius) {
                agent.context.set({
                    'name': `weight_dialog_context`,
                    'lifespan': 5,
                    'parameters': {'item': item, 'sizeOne': sizeOne, 'scheduleOne': scheduleOne, 'angle': angle, 'radius': radius }
                });
                return agent.add('What is the radius?');
            } else {
                return Dimension.findOne({
                    item: item,
                    angle: angle,
                    radius: radius,
                    ['sizeOne.tags']: sizeOne,
                    ['scheduleOne.tags']: scheduleOne,
                }, function (err, res) {
                    if (err || !res) {
                        return (
                            agent.add(`Sorry. I could not find the weight for this item.`),
                            agent.add(`${whatNext}`)
                        );
                    } else {
                        let { weight } = res.dimensions;
                        return (
                            agent.add(`The ${weight.display} of a ${sizeOne} ${item} ${scheduleOne} is ${weight.metric.value}`),
                            agent.add(`${weight.metric.uom}. ${whatNext}`)
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


function getParam(name, intent, agent) {
    if (_.isArray(agent.parameters[name]) && !_.isEmpty(agent.parameters[name])) {
        return agent.parameters[name][0];
    } else if (!!agent.parameters[name]) {
        return agent.parameters[name];
    } else {
        // let context = agent.context.get(`${agent.session}/contexts/${intent}_dialog_params_${name.toLowerCase()}`);
        let context = agent.context.get(`${intent}_dialog_context`);
        if (!_.isUndefined(context)) {
            if (_.isArray(context.parameters[name]) && !_.isEmpty(context.parameters[name])) {
                return context.parameters[name][0];
            } else {
                context.parameters[name];
            }
        } else {
            return '';
        }
    }
}

module.exports = getWeight;