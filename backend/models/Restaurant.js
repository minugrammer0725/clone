const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  menu: [
    {
    type: Schema.Types.ObjectId,
    ref: 'Dish'
    }
  ],
  deliveryTime: Number,
  deliveryFee: Number,
  priceLevel: {
    type: Number,
    min: 1,
    max: 4
  },
  picUrl: String,
  rating: Number,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review' 
    }
  ],
  categories: [
    {
      type: String
    }
  ]
});

restaurantSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);