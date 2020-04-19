const express = require("express");
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const bodyParser = require('body-parser');
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

module.exports = { welcome: welcome, getOd, getOd };


// Listen on port
const port = process.env.PORT || 8080// || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));