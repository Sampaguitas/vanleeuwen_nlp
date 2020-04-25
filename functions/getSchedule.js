const _ = require('lodash');
const Dimension = require('../models/Dimension');
const constants = require('../constants')

function getSchedule(agent) {
    //console.log(agent.session);
    // let ctx = `${agent.session}/contexts/outside_diameter_dialog_params_item`
    let whatNext = constants.whatNextArray[Math.floor(Math.random() * constants.whatNextArray.length)];
    let sizeOne = _.isArray(agent.parameters.sizeOne) && !_.isEmpty(agent.parameters.sizeOne) ? agent.parameters.sizeOne[0] :  agent.parameters.sizeOne;
    let scheduleOne = _.isArray(agent.parameters.scheduleOne) && !_.isEmpty(agent.parameters.scheduleOne) ? agent.parameters.scheduleOne[0] :  agent.parameters.scheduleOne;
    let item = _.isArray(agent.parameters.item) && !_.isEmpty(agent.parameters.item) ? agent.parameters.item[0] :  agent.parameters.item;
    let sizeTwo = _.isArray(agent.parameters.sizeTwo) && !_.isEmpty(agent.parameters.sizeTwo) ? agent.parameters.sizeTwo[0] :  agent.parameters.sizeTwo;
    // let angle = _.isArray(agent.parameters.angle) && !_.isEmpty(agent.parameters.angle) ? agent.parameters.angle[0] :  agent.parameters.angle;
    // let radius = _.isArray(agent.parameters.radius) && !_.isEmpty(agent.parameters.radius) ? agent.parameters.radius[0] :  agent.parameters.radius;
    switch (item) {
        case 'pipe':
        case 'cap':
        case 'elbow':
        case 'pipe':
        case 'reducer':
        case 'tee':
            return Dimension.findOne({
                item: item,
                ['sizeOne.tags']: sizeOne,
                ['scheduleOne.tags']: scheduleOne
            }, function (err, res) {
                if (err || !res || (!res.scheduleOne.idt && !res.scheduleOne.sch && !!res.scheduleOne.schS)) {
                    return (
                        agent.add(`Sorry. I could not find the schedule for this item.`),
                        agent.add(`${whatNext}`)
                    );
                } else {
                    let thatSchedule = [];
                    !!res.scheduleOne.idt && thatSchedule.push(res.scheduleOne.idt);
                    !!res.scheduleOne.sch && thatSchedule.push(res.scheduleOne.sch);
                    !!res.scheduleOne.schS && thatSchedule.push(res.scheduleOne.schS);
                    return (
                        agent.add(`The schedule of a ${sizeOne} ${item} ${scheduleOne} is ${thatSchedule.join(' - ')}.`),
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

module.exports = getSchedule;