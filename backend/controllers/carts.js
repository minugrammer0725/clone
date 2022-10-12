const Cart = require('../models/Cart');

const cartsRouter = require('express').Router();

const {authJwt} = require('../utils/middleware');

cartsRouter.get('/:cartId', async (request, response, next) => {
  try {
    const {cartId} = request.params;
    if (!cartId) throw new Error('missing params');

    const cart = await Cart.findById(cartId);
    response.status(200).json(cart);
  } catch (error) {
    next(error);
  }
})


// maybe not needed
cartsRouter.get('/', async (request, response, next) => {
  try {
    const carts = await Cart.find({});
    response.status(200).json(carts);
  } catch (error) {
    next(error);
  }
})


cartsRouter.put('/:cartId', authJwt, async (request, response, next) => {
  try {
    const {cartId} = request.params;
    if (!cartId) throw new Error('missing params');
    if (!request.body) throw new Error("missing body");

    const updatedCart = await Cart.findByIdAndUpdate(cartId, request.body, {new: true});
    response.status(200).json(updatedCart);
  } catch (error) {
    next(error);
  }
})


module.exports = cartsRouter;
