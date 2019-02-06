# feathers-cart

> A headless shopping cart powered by FeathersJS

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

2. Make sure that MongoDB is running locally on the default port, or modify config/default.json to provide your path to a Mongo service.

3. Install your dependencies

    ```
    cd path/to/feathers-cart; npm install
    ```

4. Start your app

    ```
    npm start
    ```

5. Use an HTTP client such as Postman to interact with the server.

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## What is implemented?

1. Full CRUD functionality on /products path: thanks to Feathers this was easy!

2. The cart is implemented on /cart path with the following behavior:

- the cart is persisted in a session in the MongoDB database;
- GET /cart returns { items: an array of items };
- GET /cart/:productId returns the corresponding cart item;
- PUT /cart/:productId adds the product to the cart with the quantity provided in the body as { quantity: a number };
- DELETE /cart/:productId deletes the corresponding item from the cart, and returns the productId.

## License

Unlicensed
