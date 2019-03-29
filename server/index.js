'use strict';

const express    = require('express'),
      bodyParser = require('body-parser'),
      routes     = require('./routes'),
      mongoose   = require('mongoose');

const mongoURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/gaiadesapego_v2'

class Server {

  constructor(){
    this.server = express();
    mongoose.connect(mongoURL);
  }

  configure(config) {
    // set express middlewares
    this.server.use(bodyParser.json());

    this.server.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      next();
    })

    // set environment configuration
    this.server.set('env', config.ENV || 'development');
    this.server.set('port', process.env.PORT || 5000);

    // initialize routes
    routes.init(this.server);
  }

  start() {
    const port = this.server.get('port');

    this.server.listen(port, () => {
      console.log(`Gaiadesapego server listening on port ${port}`);
    });
  }

  getApp() {
    return this.server;
  }

}

module.exports = new Server();
