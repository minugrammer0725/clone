const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./utils/config');
const middleware = require('./utils/middleware');

const restaurantsRouter = require('./controllers/restaurants');
const dishesRouter = require('./controllers/dishes');
const reviewsRouter = require('./controllers/reviews');
const cartItemsRouter = require('./controllers/cartItems');
const cartsRouter = require('./controllers/carts');
const dashersRouter = require('./controllers/dashers');
const ordersRouter = require('./controllers/orders');
const usersRouter = require('./controllers/users');
const addressesRouter = require('./controllers/addresses');
const loginRouter = require('./controllers/login');


const app = express();

mongoose.connect(config.MONGO_URI)
  .then(() => {
    console.log('connected to mongodb!');
  })
  .catch((err) => {
    console.log(err);
  });


// middlewares
app.use(express.json());
app.use(cors());

app.use(middleware.tokenExtractor);

// main route handler (localhost:3000)
app.get('/', (request, response) => {
  response.send({message: "Hello from backend server!"});
})

// route handlers
app.use('/api/restaurants', restaurantsRouter);
app.use('/api/dishes', dishesRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/cartItems', cartItemsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/dashers', dashersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/addresses', addressesRouter);

// public assets
// app.use(express.static())

// unknown route(404), error handler
app.use(middleware.unknownEndpoints);
app.use(middleware.errorHandler);



module.exports = app;