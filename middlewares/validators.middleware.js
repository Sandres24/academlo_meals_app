const { body, validationResult } = require('express-validator');

// Utils
const { AppError } = require('../utils/appError.util');

const checkResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessage = errors
      .array()
      .map((error) => error.msg)
      .join('. ');

    return next(new AppError(errorMessage, 400));
  }

  next();
};

const createUserValidators = [
  body('name').notEmpty().withMessage('Name can not be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email can not be empty')
    .isEmail()
    .withMessage('Must provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password can not be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters length')
    .isAlphanumeric()
    .withMessage('Password must has letters and numbers'),
  checkResult,
];

const createRestaurantValidators = [
  body('name').notEmpty().withMessage('Name can not be empty'),
  body('address').notEmpty().withMessage('Address can not be empty'),
  body('rating')
    .notEmpty()
    .withMessage('Rating can not be empty')
    .isInt({ min: 0, max: 10 })
    .withMessage('Rating must be an integer from 0 to 10'),
  checkResult,
];

const createReviewValidators = [
  body('comment').notEmpty().withMessage('Comment can not be empty'),
  body('rating')
    .notEmpty()
    .withMessage('Rating can not be empty')
    .isInt({ min: 0, max: 10 })
    .withMessage('Rating must be an integer from 0 to 10'),
  checkResult,
];

const createMealValidators = [
  body('name').notEmpty().withMessage('Name can not be empty'),
  body('price')
    .notEmpty()
    .withMessage('Price can not be empty')
    .isInt()
    .withMessage('Price must be an integer'),
  checkResult,
];

module.exports = {
  createUserValidators,
  createRestaurantValidators,
  createReviewValidators,
  createMealValidators,
};
