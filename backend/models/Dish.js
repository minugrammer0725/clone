const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  description: String,
  price: Number,
  thumbUrl: String,
  picUrl: String,
  rank: Number,
  rate: String,
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  }
});

dishSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Dish', dishSchema);