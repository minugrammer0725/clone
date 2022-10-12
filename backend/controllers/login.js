const User = require('../models/User');
const config = require('../utils/config');

const loginRouter = require('express').Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

loginRouter.post('/', async (request, response, next) => {
  try {
    const {email, password} = request.body;
    if (!email || !password) throw new Error('missing body');

    const user = await User.findOne({email}); 
    if (!user) throw new Error("invalid user credentials");

    const decoded = await bcrypt.compare(password, user.password);
    if (!decoded) throw new Error("invalid user credentials");
    
    // user verified, assign jwt
    const userToken = {
      email,
      password,
      id: user._id
    }

    const token = jwt.sign(userToken, config.JWT_KEY);
    // 3rd param: {expiresIn: 3600}
    response.status(200).send({token, user});
  } catch (error) {
    next(error);
  }
})


module.exports = loginRouter;
