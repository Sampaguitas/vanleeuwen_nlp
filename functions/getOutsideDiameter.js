const _ = require('lodash');
const Dimension = require('../models/Dimension');
const constants = require('../constants')

function getOutsideDiameter(agent) {
    //console.log(agent.session);
    // let ctx = `${agent.session}/contexts/outside_diameter_dialog_params_item`
    let whatNext = constants.whatNextArray[Math.floor(Math.random() * constants.whatNextArray.length)];
    let item = _.isArray(agent.parameters.item) && !_.isEmpty(agent.parameters.item) ? agent.parameters.item[0] :  agent.parameters.item;
    let sizeOne = _.isArray(agent.parameters.sizeOne) && !_.isEmpty(agent.parameters.sizeOne) ? agent.parameters.sizeOne[0] :  agent.parameters.sizeOne;
    // let sizeTwo = _.isArray(agent.parameters.sizeTwo) && !_.isEmpty(agent.parameters.sizeTwo) ? agent.parameters.sizeTwo[0] :  agent.parameters.sizeTwo;
    // let angle = _.isArray(agent.parameters.angle) && !_.isEmpty(agent.parameters.angle) ? agent.parameters.angle[0] :  agent.parameters.angle;
    // let radius = _.isArray(agent.parameters.radius) && !_.isEmpty(agent.parameters.radius) ? agent.parameters.radius[0] :  agent.parameters.radius;
    switch (item) {
        case 'cap':
        case 'elbow':
        case 'reducer':
        case 'tee':
            return Dimension.findOne({
                item: item,
                ['sizeOne.tags']: sizeOne
            }, function (err, res) {
                if (err || !res) {
                    return agent.add(`Sorry. I could not find the outside diameter for this item. ${whatNext}`);
                } else {
                    let od = res.dimensions.outsideDiameterRun;
                    return agent.add(`The ${od.display} of a ${sizeOne} ${item} is ${od.metric.value} ${od.metric.uom}. ${whatNext}`);
                }
            });
        default: agent.add(`Sorry, I havn't been trained for ${item} yet. ${whatNext}`);
    }
}

module.exports = getOutsideDiameter;

