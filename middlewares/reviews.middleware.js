// Models
const { Review } = require('../models/review.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const reviewValidation = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { id } = req.params;

  console.log(id);

  const review = await Review.findOne({ where: { id } });

  if (!review) {
    return next(new AppError('Review not found', 404));
  }

  if (review.userId !== sessionUser.id) {
    return next(new AppError('You are not the author of this review', 404));
  }

  req.review = review;
  next();
});

module.exports = { reviewValidation };
