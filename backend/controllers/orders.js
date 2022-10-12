const Order = require('../models/Order');
const CartItem = require('../models/CartItem');
const Dish = require('../models/Dish');
const User = require('../models/User');
const Cart = require('../models/Cart');

const {authJwt} = require('../utils/middleware');

const ordersRouter = require('express').Router();


ordersRouter.get('/:orderId', async (request, response, next) => {
  try {
    const {orderId} = request.params;
    if (!orderId) throw new Error('missing params');

    const order = await Order.findById(orderId);
    response.status(200).json(order);
  } catch (error) {
    next(error);
  }
})

ordersRouter.get('/user/:userId', authJwt, async (request, response, next) => {
  try {
    const {userId} = request.params;
    if (!userId) throw new Error('missing params');

    const orders = await Order.find({user: userId});
    response.status(200).json(orders);
  } catch (error) {
    next(error);
  }
})

ordersRouter.get('/', async (request, response, next) => {
  try {
    const orders = await Order.find({});
    response.status(200).json(orders);
  } catch (error) {
    next(error);
  }
})

ordersRouter.post('/', authJwt, async (request, response, next) => {
  try {
    const {user, items, dasher, restaurant} = request.body;
    if (!user || !items || !dasher || !restaurant) throw new Error('missing body');

    const totalPrice = await getTotalPrice(items);

    const newOrder = new Order({
      user,
      items,
      dasher,
      restaurant,
      totalPrice,
      status: 'pending'
    });

    const createdOrder = await newOrder.save();
    // add order to user's orders array
    const orderedUser = await User.findById(user);
    orderedUser.orders = orderedUser.orders.concat(createdOrder._id);
    await orderedUser.save();
    
    // empty current cart's restaurant and items fields.
    const userCart = await Cart.findOne({user});
    userCart.restaurant = null;
    userCart.items = [];
    console.log('userCart', userCart);
    await userCart.save();

    response.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
})

// Admin
ordersRouter.put('/:orderId', async (request, response, next) => {
  try {
    const {orderId} = request.params;
    if (!orderId) throw new Error('missing params');
    if (!request.body) throw new Error ('missing body');

    const updatedOrder = await Order.findByIdAndUpdate(orderId, request.body, {new: true});
    response.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
})


// helper function
async function getTotalPrice(items) {
  let sum = 0;

  for (let cartItemId of items) {
    let cartItem = await CartItem.findById(cartItemId);
    const qty = cartItem.quantity;

    let dish = await Dish.findById(cartItem.dish);
    sum += (dish.price * qty);
  }

  return sum;
}



module.exports = ordersRouter;
