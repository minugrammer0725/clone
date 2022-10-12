require('dotenv').config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const SALT = process.env.SALT;
const JWT_KEY =process.env.JWT_KEY;

module.exports = {
  PORT,
  MONGO_URI,
  SALT,
  JWT_KEY,
}