const express = require("express");
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const bodyParser = require('body-parser');
const glob = require('glob');
const _ = require('lodash');
const fs = require('fs');
const app = express();

let sizes = require('./_constants/sizes');

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
    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", welcome);
    intentMap.set("getOd", getOd)
    agent.handleRequest(intentMap);
});

function welcome(agent) {
    agent.add('Hi, How can I help you today?');
}

function getOd(agent) {
    let sizeOne = _.isArray(agent.parameters.sizeOne) && !_.isEmpty(agent.parameters.sizeOne) ? agent.parameters.sizeOne[0] :  agent.parameters.sizeOne;
    let item = _.isArray(agent.parameters.item) && !_.isEmpty(agent.parameters.item) ? agent.parameters.item[0] :  agent.parameters.item;
    console.log('sizeOne:', sizeOne);
    console.log('sizes:', sizes);
    if (item != 'pipe') {
        agent.add(`Sorry, I havn't been trained to retrive the OD of ${items} yet`);
    } else {
        let found = sizes.find(element => element.tags.includes(sizeOne));
        if (!_.isUndefined(found) && !!found.mm) {
            agent.add(`the Outside Diameter of a ${sizeOne} pipe is ${found.mm} millimeters`);
        }
    }
}

// function getWeight(agent) {
//     let sizeOne = _.isArray(agent.parameters.sizeOne) && !_.isEmpty(agent.parameters.sizeOne) ? agent.parameters.sizeOne[0] :  agent.parameters.sizeOne;
//     let sizeTwo = _.isArray(agent.parameters.sizeTwo) && !_.isEmpty(agent.parameters.sizeTwo) ? agent.parameters.sizeTwo[0] :  agent.parameters.sizeTwo;
//     let scheduleOne = _.isArray(agent.parameters.scheduleOne) && !_.isEmpty(agent.parameters.scheduleOne) ? agent.parameters.scheduleOne[0] :  agent.parameters.scheduleOne;
//     let scheduleTwo = _.isArray(agent.parameters.scheduleTwo) && !_.isEmpty(agent.parameters.scheduleTwo) ? agent.parameters.scheduleTwo[0] :  agent.parameters.scheduleTwo;
//     let item = _.isArray(agent.parameters.item) && !_.isEmpty(agent.parameters.item) ? agent.parameters.item[0] :  agent.parameters.item;
//     console.log(sizeOne);
//     agent.add(`the weight of a ${sizeOne} ${sizeTwo && 'by ' + sizeTwo} ${item}${scheduleOne && ' ' + scheduleOne} is 28.26 kilograms`)
// }

module.exports = { welcome: welcome, getOd, getOd };


// Listen on port
const port = process.env.PORT || 8080// || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));

// Compile all routers   
// var routeFolders = [],     
// routePaths = "./routes"   
// glob.sync('**/*', { cwd: routePaths }).forEach(route => {     
//     var _isFolder = !_.endsWith(route, '.js')     
//     route = '/' + route.replace(/\.[^/.]+$/, '')     
//     if (!_.endsWith(route, 'index')) {       
//         var _router = require(routePaths + route)       
//         app.use(route, _router)       
//         if (_isFolder) routeFolders.push(route)     }   })   
//         routeFolders.forEach(route => {     var _pathDeindex = routePaths + route + '/deindex.js'     
//         if (fs.existsSync(_pathDeindex))       
//         app.use(route, require(_pathDeindex))   
//     })