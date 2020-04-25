const express = require("express");
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const bodyParser = require('body-parser');
const app = express();

let functions = require('./functions');

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
    intentMap.set("Welcome", functions.welcome);
    intentMap.set("Fallback", functions.fallback);
    intentMap.set("Goodbye", functions.goodbye);
    intentMap.set("Outside Diameter", functions.getOutsideDiameter);
    intentMap.set("Nominal Pipe Size", functions.getNominalPipeSize);
    intentMap.set("Nominal Diameter", functions.getNominalDiameter);
    intentMap.set("Wall Thickness", functions.getWallThickness);
    intentMap.set("Schedule", functions.getSchedule);
    intentMap.set("Weight", functions.getWeight);
    intentMap.set("Exchange Rate", functions.exchangeRate);
    agent.handleRequest(intentMap);
});

// Listen on port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));