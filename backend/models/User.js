const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minLength: 4
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order'
    }
  ],
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart'
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: 'Address'
  }
});


userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})


module.exports = mongoose.model('User', userSchema);