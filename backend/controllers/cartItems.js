const CartItem = require('../models/CartItem');
const Cart = require('../models/Cart');
const Dish = require('../models/Dish');

const cartItemsRouter = require('express').Router();

const {authJwt} = require('../utils/middleware');

cartItemsRouter.get('/:cartItemId', async (request, response, next) => {
  try {
    const {cartItemId} = request.params;
    if (!cartItemId) throw new Error('missing params');

    const cartItem = await CartItem.findById(cartItemId);
    response.status(200).json(cartItem);
  } catch (error) {
    next(error);
  }
})
 

cartItemsRouter.get('/', async (request, response, next) => {
  try {
    const cartItems = await CartItem.find({});
    response.status(200).json(cartItems);
  } catch (error) {
    next(error);
  }
})


cartItemsRouter.post('/', authJwt, async (request, response, next) => {
  try {
    if (!request.body) throw new Error('missing body');
    const {dish, cart} = request.body;
    // first check if cart has chosen restaurant

    const currentCart = await Cart.findById(cart);
    const selectedDish = await Dish.findById(dish);

    if (!currentCart.restaurant) {
      // set the cart's restaurant
      currentCart.restaurant = selectedDish.restaurant;
      await currentCart.save();
    }

    if (currentCart.restaurant.toString() !== selectedDish.restaurant.toString()) {
      // invalid, user must add items from same restaurant
      throw new Error('cart item conflict error');
    } 

    // create cart item
    const newCartItem = new CartItem({
      ...request.body
    });
    const createdCartItem = await newCartItem.save();
    // add cart item to userCart's items array
    const userCart = await Cart.findById(createdCartItem.cart);
    userCart.items =  userCart.items.concat(createdCartItem._id);
    await userCart.save();
    response.status(201).json(createdCartItem);
  } catch (error) {
    next(error);
  }
})


cartItemsRouter.put('/:cartItemId', authJwt, async (request, response, next) => {
  try {
    const {cartItemId} = request.params;
    if (!cartItemId) throw new Error('missing params');
    if (!request.body) throw new Error('missing body');

    const updatedCartItem = await CartItem.findByIdAndUpdate(cartItemId, request.body, {new: true});
    response.status(200).json(updatedCartItem);
  } catch (error) {
    next(error);
  }
})

cartItemsRouter.delete('/:cartItemId', authJwt, async (request, response, next) => {
  try {
    const {cartItemId} = request.params;
    if (!cartItemId) throw new Error('missing params');

    // First, delete the cart item from the user cart's items array
    const carts = await Cart.find({});
    for (let cart of carts) {
      if (cart.items.includes(cartItemId)){
        // remove item from the array
        const userCart = await Cart.findById(cart._id);
        console.log('before', userCart.items);
        userCart.items = userCart.items.filter((item) => item._id.toString() !== cartItemId);
        console.log('after', userCart.items);
        await userCart.save();
      } 
    }

    await CartItem.findByIdAndDelete(cartItemId);
    response.status(200).send({message: 'cart item deleted'});
  } catch (error) {
    next(error);
  }
})


module.exports = cartItemsRouter;