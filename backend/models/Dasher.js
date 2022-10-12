const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dasherSchema = new Schema({
  name: String,
  rating: Number,
  carType: String,
  eta: Number,
  phone: String,
  available: Boolean
});

dasherSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

module.exports = mongoose.model('Dasher', dasherSchema);