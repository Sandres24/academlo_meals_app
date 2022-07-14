const express = require('express');
require('dotenv').config({ path: './config.env' });

// Routers
const { usersRouter } = require('./routes/users.routes');
const { restaurantsRouter } = require('./routes/restaurants.routes');
const { mealsRouter } = require('./routes/meals.routes');
const { ordersRouter } = require('./routes/orders.routes');

// Global error handler
const { globalErrorHandler } = require('./controllers/error.controller');

// Utils
const { AppError } = require('./utils/appError.util');

// Init express app
const app = express();

// Server settings
app.set('PORT', process.env.PORT || 4000);

// Enabling incoming JSON
app.use(express.json());

// Define endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/restaurants', restaurantsRouter);
app.use('/api/v1/meals', mealsRouter);
app.use('/api/v1/orders', ordersRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`${req.method} ${req.originalUrl} not found in this server`, 404));
});

// Global error handler
app.use(globalErrorHandler);

module.exports = { app };
