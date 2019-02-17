/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const AWS = require('aws-sdk')
const m = require('./util.js')

let creds = new AWS.Credentials(process.env.akid, process.env.sak);

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Welcome to the AWS Cost Explorer, you can ask me about your account costs!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const CEIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'CEIntent'
  },
  async handle(handlerInput) {
    //console.log(JSON.stringify(handlerInput.requestEnvelope.request))
    
    let ce = new AWS.CostExplorer({
      apiVersion: '2017-10-25',
      credentials: creds
    })

    let moment = handlerInput.requestEnvelope.request.intent.slots.moment.value
    let service = handlerInput.requestEnvelope.request.intent.slots.service.value
    let dimensionService
    
    switch (service) {
      case 'compute': 
        dimensionService = 'Amazon Elastic Compute Cloud - Compute'
        break;
      case 'storage': 
        dimensionService = 'Amazon Simple Storage Service'
        break;
      case 'lambda': 
        dimensionService = 'AWS Lambda'
        break;
      case 'support': 
        dimensionService = 'AWS Support (Business)'
        break;
      case 'load balancing': 
        dimensionService = 'Amazon Elastic Load Balancing'
        break;
      case 'elastic search': 
        dimensionService = 'Amazon Elasticsearch Service'
        break;
      case 'cloud trail': 
        dimensionService = 'AWS CloudTrail'
        break;
      case 'database': 
        dimensionService = 'Amazon Relational Database Service'
        break;
      case 'vpc': 
        dimensionService = 'Amazon Virtual Private Cloud'
        break;
      case 'cloud watch': 
        dimensionService = 'AmazonCloudWatch'
        break;
      default:
        break;
    }

    console.log(`moment: ${moment}, service: ${service}, dimension: ${dimensionService}`)
    let speechText

    let params = {
      TimePeriod: {
        End: m(moment).endDate,
        Start: m(moment).startDate
      },
      Filter: {
        Dimensions: {
          Key: 'SERVICE',
          Values: [
            dimensionService
          ]
        }
      },
      Granularity: 'MONTHLY',
      Metrics: [
        'UNBLENDED_COST'
      ]
    }

    var speechPrefix = [
      "Crickey",
      "Shivers",
      "Yeew",
      "Oh, come on",
      "Poopy"
    ];
    let crickey = speechPrefix[Math.floor(Math.random()*speechPrefix.length)];
    await ce.getCostAndUsage(params).promise()
      .then(function (data) {
        console.log(JSON.stringify(data))
        speechText = `${crickey}, your ${service} unblended costs for ${moment} were ${Number(data.ResultsByTime[0].Total.UnblendedCost.Amount).toFixed(2)} dollars`
      }).catch(function (err) {
        speechText = `Sorry, i cannot get costs for ${service}`
        console.log(err)
      })
      return handlerInput.responseBuilder
          .speak(speechText)
          .reprompt('yo, I need a moment and a service name')
          .withSimpleCard('AWS Cost Explorer', speechText)
          .getResponse()

  },
}

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can say hello to me!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    CEIntentHandler,
    LaunchRequestHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
