const Dasher = require('../models/Dasher');
const dashersRouter = require('express').Router();


dashersRouter.get('/random', async (request, response, next) => {
  try {
    const dashers = await Dasher.find({available: true});
    const randomIdx = Math.floor(Math.random() * dashers.length);
    response.status(200).json(dashers[randomIdx]);
  } catch (error) {
    next(error);
  }
})


dashersRouter.get('/:dasherId', async (request, response, next) => {
  try {
    const {dasherId} = request.params;
    if (!dasherId) throw new Error('missing params');

    const dasher = await Dasher.findById(dasherId);
    response.status(200).json(dasher);
  } catch (error) {
    next(error);
  }
})



dashersRouter.get('/', async (request, response, next) => {
  try {
    const dashers = await Dasher.find({});
    response.status(200).json(dashers);
  } catch (error) {
    next(error);
  }
})



dashersRouter.post('/', async (request, response, next) => {
  try {
    if (!request.body) throw new Error('missing body');

    const newDasher = new Dasher({
      ...request.body,
      available: true
    });

    const createdDasher = await newDasher.save();
    response.status(201).json(createdDasher);
  } catch (error) {
    next(error);
  }
})


dashersRouter.put('/:dasherId', async (request, response, next) => {
  try {
    const {dasherId} = request.params;
    if (!dasherId) throw new Error('missing params');
    if (!request.body) throw new Error('missing body');

    const updatedDasher = await Dasher.findByIdAndUpdate(dasherId, request.body, {new: true});
    response.status(200).json(updatedDasher);
  } catch (error) {
    next(error);
  }
})

module.exports = dashersRouter;