// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.

  // We store the cart information within the session.
  // Doing the following we enable the session key in params
  // within services and hooks:
  app.use('/cart', (req, res, next) => {
    req.feathers.session = req.session;
    next();
  });
};
