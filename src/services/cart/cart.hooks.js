const attachProduct = async context => {
  const { app, id, params } = context;
  const product = await app.service('products').get(id);
  params.product = product;
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [attachProduct],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
