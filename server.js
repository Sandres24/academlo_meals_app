// app
const { app } = require('./app');

// Models
const { User } = require('./models/user.model');
const { Restaurant } = require('./models/restaurant.model');
const { Meal } = require('./models/meal.model');
const { Review } = require('./models/review.model');
const { Order } = require('./models/order.model');

// Utils
const { db } = require('./utils/database.util');

// Database authentication
db.authenticate()
  .then(() => console.log('Database authenticated'))
  .catch((err) => console.log(err));

// Establish model's relations
// 1 Restaurant <--> M Review
Restaurant.hasMany(Review);
Review.belongsTo(Restaurant);

// 1 Restaurant <---> M Meal
Restaurant.hasMany(Meal);
Meal.belongsTo(Restaurant);

// 1 Meal <---> 1 Order
Meal.hasOne(Order);
Order.belongsTo(Meal);

// 1 User <---> M Order
User.hasMany(Order);
Order.belongsTo(User);

// 1 User <---> M Review
User.hasMany(Review);
Review.belongsTo(User);

// Database sync
db.sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log(err));

// Starting server
app.listen(app.get('PORT'), () => {
  console.log(`Server on port ${app.get('PORT')}`);
});
