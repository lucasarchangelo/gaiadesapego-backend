'use strict';

const productController = require('./controllers/products');
const userController = require('./controllers/user');

class Routes {

  static init(server) {
    server.use('/products', productController);
    server.use('/login', userController);
  }

}

module.exports = Routes;
