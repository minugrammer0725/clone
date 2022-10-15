const jwt = require('jsonwebtoken');

const config = require('./config');

const unknownEndpoints = (request, response, next) => {
  response.send({message: "Oops 404!"});
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

const authJwt = (request, response, next) => {
  const token = request.token;
  console.log('User Auth: token ', token);

  try {
    jwt.verify(token, config.JWT_KEY);
    next();
  } catch (error) {
    console.log(error);
    response.send({error: "invalid web token"});
    // redirect to login page?
  }
}

const errorHandler = (error, request, response, next) => {
  console.log('hello from error handler!');
  console.log(error.name);
  console.log(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'});
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({error: "Validation error"});
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).send({error: "invalid web token"});
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).send({error: "token expired"});
  } else if (error.name === 'Error') {
    if (error.message === 'missing params') {
      return response.status(400).send({error: "missing params"});
    } else if (error.message === 'missing body') {
      return response.status(400).send({error: "missing body"});
    } else if (error.messge === "invalid user credentials") {
      return response.status(400).send({error: "invalid user credentials"});
    } else if (error.message === "cart item conflict error") {
      return response.status(400).send({error: "cart item conflict error"});
    }
  } 
  return response.status(401).send({error: "oops something went wrong"});
  
}

module.exports = {
  unknownEndpoints,
  errorHandler,
  authJwt,
  tokenExtractor
}