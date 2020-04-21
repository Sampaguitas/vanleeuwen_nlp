const express = require("express");
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const bodyParser = require('body-parser');
const app = express();
const _ = require('lodash');

let dimensions = require('./_constants/dimensions');

//bodyParser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
.connect(db,{useNewUrlParser:true, useUnifiedTopology: true})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const { WebhookClient } = require("dialogflow-fulfillment");

app.post("/dialogflow", express.json(), (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });

    // console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
    // console.log('Dialogflow Request body: ' + JSON.stringify(req.body));

    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", welcome);
    intentMap.set("Outside Diameter", getOutsideDiameter);
    intentMap.set("Nominal Pipe Size", getNominalPipeSize);
    intentMap.set("Nominal Diameter", getNominalDiameter);
    intentMap.set("Wall Thickness", getWallThickness);
    intentMap.set("Schedule", getSchedule);
    intentMap.set("Weight", getWeight);
    agent.handleRequest(intentMap);
});


const whatNextPhrases = [
    'What else can I help with?',
    'Is there anithing else I can help you with?',
    'What else would you like to know?', 
];

let whatNext = whatNextPhrases[Math.floor(Math.random() * whatNextPhrases.length)];
    

function welcome(agent) {
    agent.add('Hi, How can I help you today?');
}

function getOutsideDiameter(agent) {
    let sizeOne = _.isArray(agent.parameters.sizeOne) && !_.isEmpty(agent.parameters.sizeOne) ? agent.parameters.sizeOne[0] :  agent.parameters.sizeOne;
    let item = _.isArray(agent.parameters.item) && !_.isEmpty(agent.parameters.item) ? agent.parameters.item[0] :  agent.parameters.item;
    switch (item) {
        case 'pipe':
            let found = dimensions.find(element => element.item === item && element.sizeOne.tags.includes(sizeOne));
            if (!_.isUndefined(found) && found.dimensions.hasOwnProperty('outsideDiameter')) {
                return agent.add(`The outside diameter of a ${sizeOne} ${item} is ${found.dimensions.outsideDiameter.metric.value} ${found.dimensions.outsideDiameter.metric.uom}. ${whatNext}`);
            } else {
                return agent.add(`Sorry. I could not find the outside diameter for this item. ${whatNext}`);
            }
        default: agent.add(`Sorry, I havn't been trained for ${item} yet. ${whatNext}`);
    }
}

function getNominalPipeSize(agent) {
    let sizeOne = _.isArray(agent.parameters.sizeOne) && !_.isEmpty(agent.parameters.sizeOne) ? agent.parameters.sizeOne[0] :  agent.parameters.sizeOne;
    let item = _.isArray(agent.parameters.item) && !_.isEmpty(agent.parameters.item) ? agent.parameters.item[0] :  agent.parameters.item;
    switch (item) {
        case 'pipe':
            let found = dimensions.find(element => element.item === item && element.sizeOne.tags.includes(sizeOne));
            if (!_.isUndefined(found) && !!found.sizeOne.nps) {
                return agent.add(`The nominal pipe size of a ${sizeOne} ${item} is ${found.sizeOne.nps}. ${whatNext}`);
            } else {
                return agent.add(`Sorry. I could not find the nominal pipe size for this item. ${whatNext}`);
            }
        default: agent.add(`Sorry, I havn't been trained for ${item} yet. ${whatNext}`);
    }
}

function getNominalDiameter(agent) {
    let sizeOne = _.isArray(agent.parameters.sizeOne) && !_.isEmpty(agent.parameters.sizeOne) ? agent.parameters.sizeOne[0] :  agent.parameters.sizeOne;
    let item = _.isArray(agent.parameters.item) && !_.isEmpty(agent.parameters.item) ? agent.parameters.item[0] :  agent.parameters.item;
    switch (item) {
        case 'pipe':
            let found = dimensions.find(element => element.item === item && element.sizeOne.tags.includes(sizeOne));
            if (!_.isUndefined(found) && !!found.sizeOne.dn) {
                return agent.add(`The nominal diameter of a ${sizeOne} ${item} is ${found.sizeOne.dn}. ${whatNext}`);
            } else {
                return agent.add(`Sorry. I could not find the nominal diameter for this item. ${whatNext}`);
            }
        default: agent.add(`Sorry, I havn't been trained for ${item} yet. ${whatNext}`);
    }
}

function getWallThickness(agent) {
    let sizeOne = _.isArray(agent.parameters.sizeOne) && !_.isEmpty(agent.parameters.sizeOne) ? agent.parameters.sizeOne[0] :  agent.parameters.sizeOne;
    let scheduleOne = _.isArray(agent.parameters.scheduleOne) && !_.isEmpty(agent.parameters.scheduleOne) ? agent.parameters.scheduleOne[0] :  agent.parameters.scheduleOne;
    let item = _.isArray(agent.parameters.item) && !_.isEmpty(agent.parameters.item) ? agent.parameters.item[0] :  agent.parameters.item;
    switch (item) {
        case 'pipe':
            let found = dimensions.find(function (element) {
                return element.item === item && element.sizeOne.tags.includes(sizeOne) && element.scheduleOne.tags.includes(scheduleOne);
            });
            if (!_.isUndefined(found) && found.dimensions.hasOwnProperty('wallThickness')) {
                return agent.add(`The wall thickness of a ${sizeOne} ${item} ${scheduleOne} is ${found.dimensions.wallThickness.metric.value} ${found.dimensions.wallThickness.metric.uom}. ${whatNext}`);
            } else {
                return agent.add(`Sorry. I could not find the wall thickness for this item. ${whatNext}`);
            }
        default: agent.add(`Sorry, I havn't been trained for ${item} yet. ${whatNext}`);
    }
}

function getSchedule(agent) {
    let thatSchedule = [];
    let sizeOne = _.isArray(agent.parameters.sizeOne) && !_.isEmpty(agent.parameters.sizeOne) ? agent.parameters.sizeOne[0] :  agent.parameters.sizeOne;
    let scheduleOne = _.isArray(agent.parameters.scheduleOne) && !_.isEmpty(agent.parameters.scheduleOne) ? agent.parameters.scheduleOne[0] :  agent.parameters.scheduleOne;
    let item = _.isArray(agent.parameters.item) && !_.isEmpty(agent.parameters.item) ? agent.parameters.item[0] :  agent.parameters.item;
    switch (item) {
        case 'pipe':
            let found = dimensions.find(function (element) {
                return element.item === item && element.sizeOne.tags.includes(sizeOne) && element.scheduleOne.tags.includes(scheduleOne);
            });
            if (!_.isUndefined(found) && (!!found.scheduleOne.idt || !!found.scheduleOne.sch || !!found.scheduleOne.schS)) {
                !!found.scheduleOne.idt && thatSchedule.push(found.scheduleOne.idt);
                !!found.scheduleOne.sch && thatSchedule.push(found.scheduleOne.sch);
                !!found.scheduleOne.schS && thatSchedule.push(found.scheduleOne.schS);
                return agent.add(`The schedule of a ${sizeOne} ${item} ${scheduleOne} is ${thatSchedule.join(' - ')}. ${whatNext}`);
            } else {
                return agent.add(`Sorry. I could not find the schedule for this item. ${whatNext}`);
            }
        default: agent.add(`Sorry, I havn't been trained for ${item} yet. ${whatNext}`);
    }
}

function getWeight(agent) {
    let sizeOne = _.isArray(agent.parameters.sizeOne) && !_.isEmpty(agent.parameters.sizeOne) ? agent.parameters.sizeOne[0] :  agent.parameters.sizeOne;
    let scheduleOne = _.isArray(agent.parameters.scheduleOne) && !_.isEmpty(agent.parameters.scheduleOne) ? agent.parameters.scheduleOne[0] :  agent.parameters.scheduleOne;
    let item = _.isArray(agent.parameters.item) && !_.isEmpty(agent.parameters.item) ? agent.parameters.item[0] :  agent.parameters.item;
    switch (item) {
        case 'pipe':
            let found = dimensions.find(function (element) {
                return element.item === item && element.sizeOne.tags.includes(sizeOne) && element.scheduleOne.tags.includes(scheduleOne);
            });
            if (!_.isUndefined(found) && found.dimensions.hasOwnProperty('weight')) {
                return agent.add(`The weight of a ${sizeOne} ${item} ${scheduleOne} is ${found.dimensions.weight.metric.value} ${found.dimensions.weight.metric.uom}. ${whatNext}`);
            } else {
                return agent.add(`Sorry. I could not find the weight for this item. ${whatNext}`);
            }
        default: agent.add(`Sorry, I havn't been trained for ${item} yet. ${whatNext}`);
    }
}

module.exports = { 
    welcome: welcome,
    getOutsideDiameter: getOutsideDiameter,
    getNominalPipeSize: getNominalPipeSize,
    getNominalDiameter: getNominalDiameter,
    getWallThickness: getWallThickness,
    getSchedule: getSchedule,
    getWeight: getWeight
};

// Listen on port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));