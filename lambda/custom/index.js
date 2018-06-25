'use strict'

const Alexa = require('alexa-sdk')


const PomodoroTimerHandler = {
	canHandle(handlerInput){
		const request =  handlerInput.requestEvelope.request;
		return request.type === 'LaunchRequest' || request.type === 'IntentRequest'
		 && request.intent.name === 'PomodoroTimer'

	},
	handle (handlerInput){


	}

}

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('Pomodoro Timer ended. Goodbye!')
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
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
      .speak('Sorry, an error happened. Please try again')
      .reprompt('Sorry, an error happened. Please try again or with a different command')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = 	skillBuilder
	.addRequestHandlers(
	PomodoroTimerHandler
	HelpHandler,
	ExitHandler,
	FallbackHandler,
	SessionEndedRequestHandler
)
.addErrorHandlers(ErrorHandler)
.lambda()
