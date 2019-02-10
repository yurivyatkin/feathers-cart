const app = require('../../src/app');

describe('\'cart\' service', () => {
  it('registered the service', () => {
    const service = app.service('cart');
    expect(service).toBeTruthy();
  });
  it.todo('lists the items added to the cart');
  it.todo('shows an individual item in the cart, given the product\'s id');
  it.todo('adds one item to the list, if no quantity provided');
  it.todo('adds a given quantity of items to the list');
  it.todo('replaces the item with a given quantity, if the product with the given id is in the list');
  it.todo('shows the cart total alongside the list');
  it.todo('updates the cart total when an item is added');
  it.todo('updates the cart total when an item is updated');
  it.todo('presents all prices rounded up to 2 decimal places');
});
