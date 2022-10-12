const Review = require('../models/Review');

const reviewsRouter = require('express').Router();

reviewsRouter.get('/:reviewId', async (request, response, next) => {
  try {
    const { reviewId } = request.params;
    if (!reviewId) throw new Error('missing params');
    const review = await Review.findById(reviewId);
    response.status(200).json(review);
  } catch (error) {
    next(error);
  }
})

reviewsRouter.get('/', async (request, response, next) => {
  try {
    const reviews = await Review.find({});
    response.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
})


// Admin (review feature is not part of the clone app)
reviewsRouter.post('/', async (request, response, next) => {
  try {
    if (!request.body) throw new Error('missing body');
    const newReview = new Review({
      ...request.body
    });
    const savedReview = await newReview.save();
    response.status(201).json(savedReview);
  } catch (error) {
    next(error);
  }
})




module.exports = reviewsRouter;