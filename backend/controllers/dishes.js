const Dish = require('../models/Dish');

const dishesRouter = require('express').Router();


dishesRouter.get('/:dishId', async (request, response, next) => {
  try {
    const {dishId} = request.params;
    if (!dishId) throw new Error('missing params');

    const dish = await Dish.findById(dishId);
    response.status(200).json(dish);
  } catch (error) {
    next(error);
  }
})

dishesRouter.get('/restaurant/:restaurantId', async (request, response, next) => {
  try {
    const {restaurantId} = request.params;
    if (!restaurantId) throw new Error('missing params');

    const dishes = await Dish.find({restaurant: restaurantId});
    response.status(200).json(dishes);
  } catch (error) {
    next(error);
  }
})


dishesRouter.get('/', async (request, response, next) => {
  try {
    const dishes = await Dish.find({});
    response.status(200).json(dishes);
  } catch (error) {
    next(error);
  }
})

 
// Admin
dishesRouter.post('/', async (request, response, next) => {
  try {
    if (!request.body) throw new Error('missing body');

    const newDish = new Dish({
      ...request.body
    });
    const savedDish = await newDish.save();
    response.status(201).json(savedDish);
  } catch (error) {
    next(error);
  }
})

// Admin
dishesRouter.put('/:dishId', async (request, response, next) => {
  try {
    const {dishId} = request.params;
    if (!dishId) throw new Error('missing params');
    const updateInfo = request.body;
    if (!updateInfo) throw new Error('missing body');
    
    const updatedDish = await Dish.findByIdAndUpdate(dishId, updateInfo, {new: true});
    response.status(200).json(updatedDish);
  } catch (error) {
    next(error);
  }
})



module.exports = dishesRouter;
