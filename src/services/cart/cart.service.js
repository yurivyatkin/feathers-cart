// Initializes the `cart` service on path `/cart`
const createService = require('./cart.class.js');
const hooks = require('./cart.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/cart', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('cart');

  service.hooks(hooks);
};
