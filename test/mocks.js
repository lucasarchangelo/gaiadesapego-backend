'use strict';

const nock = require('nock');

class Mocks {
  /*
  static mockModelInfoRequest(year, manufacturer, model, statusCode, response) {
    nock(NHTSA_URL)
      .get(`/modelyear/${year}/make/${manufacturer}/model/${encodeURIComponent(model)}?format=json`)
      .reply(statusCode, response);
  }

  static mockCrashRatingRequest(vehicleId, statusCode, response) {
    nock(NHTSA_URL)
      .get(`/VehicleId/${vehicleId}?format=json`)
      .reply(statusCode, response);
  }
  */

}

module.exports = Mocks;
