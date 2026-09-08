'use strict';

const Alexa = require('ask-sdk-core');
const definitions = require('./definitions.json');
const responses = require('./responses.json');

const normalizedDefinitions = new Map(
  Object.entries(definitions).map(([term, definition]) => [
    normalizeTerm(term),
    { term, definition }
  ])
);

function normalizeTerm(value = '') {
  return value
    .trim()
    .toLowerCase()
    .replace(/[._-]+/g, ' ')
    .replace(/\s+/g, ' ');
}

function getCanonicalSlotValue(slot) {
  const authorities = slot?.resolutions?.resolutionsPerAuthority ?? [];

  for (const authority of authorities) {
    const value = authority?.values?.[0]?.value?.name;
    if (value) {
      return value;
    }
  }

  return slot?.value;
}

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(responses.LaunchRequest.ask)
      .reprompt(responses.LaunchRequest.reprompt)
      .getResponse();
  }
};

const GetDefinitionIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetDefinition'
    );
  },
  handle(handlerInput) {
    const slot = handlerInput.requestEnvelope.request.intent?.slots?.Term;
    const spokenTerm = getCanonicalSlotValue(slot);

    if (!spokenTerm) {
      return handlerInput.responseBuilder
        .speak(`You need to provide a MongoDB term. ${responses['AMAZON.HelpIntent'].reprompt}`)
        .reprompt(responses['AMAZON.HelpIntent'].reprompt)
        .getResponse();
    }

    const match = normalizedDefinitions.get(normalizeTerm(spokenTerm));

    if (!match) {
      return handlerInput.responseBuilder
        .speak(`I'm sorry, I don't know the definition of ${spokenTerm}. Please try another MongoDB term.`)
        .getResponse();
    }

    return handlerInput.responseBuilder
      .speak(match.definition)
      .withSimpleCard(match.term, match.definition)
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent'
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(responses['AMAZON.HelpIntent'].ask)
      .reprompt(responses['AMAZON.HelpIntent'].reprompt)
      .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    if (Alexa.getRequestType(handlerInput.requestEnvelope) !== 'IntentRequest') {
      return false;
    }

    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    return intentName === 'AMAZON.CancelIntent' || intentName === 'AMAZON.StopIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(responses['AMAZON.StopIntent'].tell)
      .getResponse();
  }
};

const FallbackIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent'
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(responses['AMAZON.HelpIntent'].ask)
      .reprompt(responses['AMAZON.HelpIntent'].reprompt)
      .getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    return handlerInput.responseBuilder.getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.error(`Unhandled error: ${error.stack || error}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I had trouble looking up that MongoDB term. Please try again.')
      .reprompt(responses['AMAZON.HelpIntent'].reprompt)
      .getResponse();
  }
};

const skill = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        GetDefinitionIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .create();

exports.skill = skill;

exports.handler = async (event, context) => {
  return skill.invoke(event, context);
};