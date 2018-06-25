'use strict'

const Alexa = require('alexa-sdk')
//Alexa Skills not possible to do timers/alerts yet? Have to look into notifications via AVS

//https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/issues/300



const PomodoroClockHandler = {
	canHandle(handlerInput){
		const request =  handlerInput.requestEvelope.request;
		return request.type === 'LaunchRequest' || request.type === 'IntentRequest'
		 && request.intent.name === 'setPomodoroTimer'

	},
	handle (handlerInput){
	const request = handlerInput.requestEnvelope.request;
    const responseBuilder = handlerInput.responseBuilder;
    let time = 25;
    let break = 5;
    let now = new Date()
    now = Date().getTime()

    if(request.intent.slots.timeAmt.value){
    	time = request.intent.slots.timeAmt.value;
    }

	const speechOutput = `Your pomodoro clock is set for, ${} minutes and a ${} minutes break. `;
	return responseBuilder.speak(speechOutput).reprompt(speechOutput).getResponse();

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
	PomodoroClockHandler
	HelpHandler,
	ExitHandler,
	FallbackHandler,
	SessionEndedRequestHandler
)
.addErrorHandlers(ErrorHandler)
.lambda()
