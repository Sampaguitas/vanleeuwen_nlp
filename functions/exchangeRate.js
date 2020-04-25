const _ = require('lodash');
const fetch = require("node-fetch");
const constants = require('../constants');
const currencylayer_key = require('../config/keys').currencylayer_key;

function exchangeRate(agent) {
    let whatNext = constants.whatNextArray[Math.floor(Math.random() * constants.whatNextArray.length)];
    let currencyFrom = _.isArray(agent.parameters.currencyFrom) && !_.isEmpty(agent.parameters.currencyFrom) ? agent.parameters.currencyFrom[0] :  agent.parameters.currencyFrom;
    let currencyTo = _.isArray(agent.parameters.currencyTo) && !_.isEmpty(agent.parameters.currencyTo) ? agent.parameters.currencyTo[0] :  agent.parameters.currencyTo;
    let number = _.isArray(agent.parameters.number) && !_.isEmpty(agent.parameters.number) ? agent.parameters.number[0] :  !!agent.parameters.number ? agent.parameters.number : 1;
    return getRate(currencyFrom, currencyTo)
    .then(res => {
        let conversion = Number(number) / Number(res.rateFrom) * Number(res.rateTo);
        return (
            agent.add(`${number} ${currencyFrom} is equal to ${Math.round((conversion + Number.EPSILON) * 100000) / 100000} ${currencyTo}.`),
            agent.add(`${whatNext}`)
        );
    })
    .catch(err => {
        switch(err) {
            case 104: 
                return (
                    agent.add(`I have reached my quota of currency conversion for this month...`),
                    agent.add(`${whatNext}`)
                );
            default: 
                return (
                    agent.add(`Sorry, could not retrive this currency conversion...`),
                    agent.add(`${whatNext}`)
                );
        }
    });
}

function getRate(currencyFrom, currencyTo) {
    return new Promise(function(resolve, reject) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        }
        return fetch(`http://apilayer.net/api/live?access_key=${currencylayer_key}&currencies=${currencyFrom},${currencyTo}&source=USD&format=1`, requestOptions)
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                resolve({
                    rateFrom: json.quotes[`USD${currencyFrom}`],
                    rateTo: json.quotes[`USD${currencyTo}`],
                })
            } else {
                reject(json.error.code);
            }
        });
    });
}

module.exports = exchangeRate;