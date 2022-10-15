const Address = require('../models/Address');
const User = require('../models/User');

const addressesRouter = require('express').Router();

addressesRouter.get('/:addressId', async (request, response, next) => {
try {
  const {addressId} = request.params;
  if (!addressId) throw new Error('missing params');

  const addr = await Address.findById(addressId);
  response.status(200).json(addr);
} catch (error) {
  next(error);
}
})


addressesRouter.post('/', async (request, response, next) => {
try {
  if (!request.body) throw new Error('missing body');

  const newAddress = new Address({
    ...request.body,
    country: "USA"
  })
  const createdAddress = await newAddress.save();

  // connect address to users
  const user = await User.findById(createdAddress.user);
  console.log('found user is ', user);
  user.address = createdAddress._id;
  await user.save();
  response.status(201).json(createdAddress);
} catch (error) {
  next(error);
}
})


addressesRouter.put('/:addressId', async (request, response, next) => {
try {
  const {addressId} = request.params;
  if (!addressId) throw new Error('missing params');
  if (!request.body) throw new Error('missing body');

  const updatedAddress = await Address.findByIdAndUpdate(addressId, request.body, {new: true});
  response.status(200).json(updatedAddress);
} catch (error) {
  next(error);
}
})

module.exports = addressesRouter