const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
  dish: {
    type: Schema.Types.ObjectId,
    ref: 'Dish',
    required: true
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart',
    required: true
  },
  quantity: {
    type: Number,
    min: 1
  }
})


cartItemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

module.exports = mongoose.model('CartItem', cartItemSchema);