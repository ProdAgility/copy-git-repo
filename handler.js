'use strict';
const copyRepo = require('./copyRepo')

module.exports.handler = async (event) => {
  let handlerReturnValue;
  let functionReturnValue;

  const {
    existing,
    copy
  } = event.body ? JSON.parse(event.body) : event;

  try {
    functionReturnValue = await copyRepo(existing, copy)
  } catch(err) {
    console.error(err)
  }

  if (event.body) {
    if (!( (!!functionReturnValue) && (functionReturnValue.constructor === Object)) ) {
      functionReturnValue = { functionReturnValue }
    }
    handlerReturnValue = {
      statusCode: 201,
      body: JSON.stringify(functionReturnValue)
    };
  } else {
    handlerReturnValue = functionReturnValue;
  }

  return handlerReturnValue;
};
