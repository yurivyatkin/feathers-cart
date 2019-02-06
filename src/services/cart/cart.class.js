/* eslint-disable no-unused-vars */
class Service {
  constructor(options) {
    this.options = options || {};
  }

  // This should return the list of all items in the cart
  async find(params) {
    const { session } = params;
    const { cart = {} } = session;
    return cart;
  }

  // This should return the item with the given id from the cart
  async get(id, params) {
    const { session } = params;
    const { cart = {} } = session;
    const { items = [] } = cart;
    // _id is an object:
    const product = items.find(item => item._id == id);
    return product;
  }

  // This should not be here %)
  // async create(data, params) {
  //   if (Array.isArray(data)) {
  //     return Promise.all(data.map(current => this.create(current, params)));
  //   }

  //   return data;
  // }

  // This should add the item with the given id to the cart
  // ... with the quantity taken from the data
  // (this means that to add a product, the quantity must be supplied in the body)
  async update(id, data, params) {
    const { session } = params;
    const { cart = {} } = session;
    // The product is added in a hook:
    const product = params.product;
    // TODO: don't duplicate products
    const prevItems = cart.items || [];
    const prodIdx = prevItems.findIndex(item => item._id == id);
    // const items = [...(cart.items || []), product];
    const newItem = Object.assign({}, product, { quantity: data.quantity });
    const items = [
      ...prevItems.slice(0, prodIdx),
      newItem,
      ...prevItems.slice(prodIdx + 1),
    ];
    cart.items = items;
    session.cart = cart;
    return data;
  }

  // This is not needed: update is enough
  // async patch(id, data, params) {
  //   return data;
  // }

  // This should delete the item with the given id from the cart
  async remove(id, params) {
    const { session } = params;
    const { cart = {} } = session;
    const prevItems = cart.items || [];
    // _id is an object:
    const prodIdx = prevItems.findIndex(item => item._id == id);
    const items = [
      ...prevItems.slice(0, prodIdx),
      ...prevItems.slice(prodIdx + 1),
    ];
    cart.items = items;
    session.cart = cart;
    return { id };
  }
}

module.exports = function(options) {
  return new Service(options);
};

module.exports.Service = Service;
