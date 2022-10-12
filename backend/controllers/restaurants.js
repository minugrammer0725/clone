const restaurantsRouter = require('express').Router();

const Restaurant = require('../models/Restaurant');


restaurantsRouter.get('/:restaurantId', async (request, response, next) => {
  try {
    const {restaurantId} = request.params;
    if (!restaurantId) throw new Error('missing params');

    const restaurant = await Restaurant.findById(restaurantId);
    response.status(200).json(restaurant);
  } catch (error) {
    next(error);
  }
})

restaurantsRouter.get('/', async (request, response, next) => {
  try {
    const restaurants = await Restaurant.find({});
    response.status(200).json(restaurants);
  } catch (error) {
    next(error);
  }

})

// Admin
restaurantsRouter.post('/', async (request, response, next) => {
  try {
    if (!request.body) throw new Error('missing body');

    let newRestauant = new Restaurant({
      ...request.body
    });
    const createdRestaurant = await newRestauant.save();
    response.status(201).json(createdRestaurant);
  } catch (error) {
    next(error);
  }
})

// Admin
restaurantsRouter.put('/:restaurantId', async (request, response, next) => {
  try {
    const {restaurantId} = request.params;
    if (!restaurantId) throw new Error('missing params');
    const updateInfo = request.body;
    if (!updateInfo) throw new Error('missing body');
    
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(restaurantId, updateInfo, {new: true});
    response.status(200).json(updatedRestaurant);
  } catch (error) {
    next(error);
  }
})


module.exports = restaurantsRouter;