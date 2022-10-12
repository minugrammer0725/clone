const User = require('../models/User');
const Cart = require('../models/Cart');

const usersRouter = require('express').Router();

const bcrypt = require('bcrypt');
const config = require('../utils/config');
const {authJwt} = require('../utils/middleware');

usersRouter.get('/:userId', async (request, response, next) => {
  try {
    const {userId} = request.params;
    if (!userId) throw new Error('missing params');

    const user = await User.findById(userId);
    response.status(200).json(user);
  } catch (error) {
    next(error);
  }
})

// Admin
usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({});
    response.status(200).json(users);
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const {username, email, password} = request.body;
    if (!username || !email || !password) throw new Error('missing body');

    const hashed = await bcrypt.hash(password, Number(config.SALT));
    const newUser = new User({
      username,
      email,
      password: hashed
    });
    const createdUser = await newUser.save();
    
    // create a cart and attach to user
    const newCart = new Cart({
      user: createdUser._id
    });
    const createdCart = await newCart.save();
    createdUser.cart = createdCart._id;
    await createdUser.save();
    response.status(201).json(createdUser);
  } catch (error) {
    next(error);
  }
})

usersRouter.put('/:userId', authJwt, async (request, response, next) => {
  try {
    const {userId} = request.params;
    if (!userId) throw new Error('missing params'); 
    if (!request.body) throw new Error('missing body');

    const updatedUser = await User.findByIdAndUpdate(userId, request.body, {new: true});
    response.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
})



module.exports = usersRouter;