'use strict';

const expect    = require('expect'),
      request   = require('supertest'),
      mocks     = require('../mocks'),
      responses = require('../resources/nhtsa-responses.json'),
      server    = require('../../server/index');

let app;

before(async () => {
  server.configure({});
  server.start();
  app = server.getApp();
});

describe('Gaia Resource', () => {
  /*

  describe('GET /vehicles/:year/:manufacturer/:model', () => {

    it('should return successful response when searching for 2015 Toyota Yaris', (done) => {

      mocks.mockModelInfoRequest(2015, 'Toyota', 'Yaris', 200, responses["MODEL_INFO"]["2015_TOYOTA_YARIS"]);

      request(app)
        .get('/vehicles/2015/Toyota/Yaris')
        .expect(200)
        .expect((res) => {

          expect(res.body).toEqual({
            Count: 2,
            Results: [
              {
                Description: '2015 Toyota Yaris 3 HB FWD',
                VehicleId: 9791,
              },
              {
                Description: '2015 Toyota Yaris Liftback 5 HB FWD',
                VehicleId: 9146
              },
            ]
          });

        })
        .end(done);

    });

    it('should return empty response when searching for 2013 Ford Crown Victoria', (done) => {

      mocks.mockModelInfoRequest(2013, 'Ford', 'Crown Victoria', 200, responses["MODEL_INFO"]["2013_FORD_CROWN_VICTORIA"]);

      request(app)
        .get('/vehicles/2013/Ford/Crown%20Victoria')
        .expect(200)
        .expect((res) => {

          expect(res.body).toEqual({
            Count: 0,
            Results: []
          });

        })
        .end(done);

    });

    it('should return valid empty response even when the API returns an error code', (done) => {

      mocks.mockModelInfoRequest(2013, 'Some', 'Faulty Car', 400);

      request(app)
        .get('/vehicles/2013/Some/Faulty%20Car')
        .expect(200)
        .expect((res) => {

          expect(res.body).toEqual({
            Count: 0,
            Results: []
          });

        })
        .end(done);

    });

  });

  describe('GET /vehicles/:year/:manufacturer/:model?withRating', () => {

    it('should return successful response when searching for 2015 Audi A3', (done) => {

      mocks.mockModelInfoRequest(2015, 'Audi', 'A3', 200, responses["MODEL_INFO"]["2015_AUDI_A3"]);
      mocks.mockCrashRatingRequest(9403, 200, responses["CRASH_RATING"]["9403"]);
      mocks.mockCrashRatingRequest(9405, 200, responses["CRASH_RATING"]["9405"]);
      mocks.mockCrashRatingRequest(9406, 200, responses["CRASH_RATING"]["9406"]);
      mocks.mockCrashRatingRequest(9408, 200, responses["CRASH_RATING"]["9408"]);

      request(app)
        .get('/vehicles/2015/Audi/A3?withRating=true')
        .expect(200)
        .expect((res) => {

          expect(res.body).toEqual({
            Count: 4,
            Results: [
              {
                Description: "2015 Audi A3 4 DR AWD",
                VehicleId: 9403,
                CrashRating: "5"
              },
              {
                Description: "2015 Audi A3 4 DR FWD",
                VehicleId: 9408,
                CrashRating: "5"
              },
              {
                Description: "2015 Audi A3 C AWD",
                VehicleId: 9405,
                CrashRating: "Not Rated"
              },
              {
                Description: "2015 Audi A3 C FWD",
                VehicleId: 9406,
                CrashRating: "Not Rated"
              }
            ]
          });

        })
        .end(done);

    });

    it('should not return crash rating info if withRating=false', (done) => {

      mocks.mockModelInfoRequest(2015, 'Audi', 'A3', 200, responses["MODEL_INFO"]["2015_AUDI_A3"]);
      mocks.mockCrashRatingRequest(9403, 200, responses["CRASH_RATING"]["9403"]);
      mocks.mockCrashRatingRequest(9405, 200, responses["CRASH_RATING"]["9405"]);
      mocks.mockCrashRatingRequest(9406, 200, responses["CRASH_RATING"]["9406"]);
      mocks.mockCrashRatingRequest(9408, 200, responses["CRASH_RATING"]["9408"]);

      request(app)
        .get('/vehicles/2015/Audi/A3?withRating=false')
        .expect(200)
        .expect((res) => {

          expect(res.body).toEqual({
            Count: 4,
            Results: [
              {
                Description: "2015 Audi A3 4 DR AWD",
                VehicleId: 9403,
              },
              {
                Description: "2015 Audi A3 4 DR FWD",
                VehicleId: 9408,
              },
              {
                Description: "2015 Audi A3 C AWD",
                VehicleId: 9405,
              },
              {
                Description: "2015 Audi A3 C FWD",
                VehicleId: 9406,
              }
            ]
          });

        })
        .end(done);

    });

    it('should not return crash rating info if withRating=bananas', (done) => {

      mocks.mockModelInfoRequest(2015, 'Audi', 'A3', 200, responses["MODEL_INFO"]["2015_AUDI_A3"]);
      mocks.mockCrashRatingRequest(9403, 200, responses["CRASH_RATING"]["9403"]);
      mocks.mockCrashRatingRequest(9405, 200, responses["CRASH_RATING"]["9405"]);
      mocks.mockCrashRatingRequest(9406, 200, responses["CRASH_RATING"]["9406"]);
      mocks.mockCrashRatingRequest(9408, 200, responses["CRASH_RATING"]["9408"]);

      request(app)
        .get('/vehicles/2015/Audi/A3?withRating=bananas')
        .expect(200)
        .expect((res) => {

          expect(res.body).toEqual({
            Count: 4,
            Results: [
              {
                Description: "2015 Audi A3 4 DR AWD",
                VehicleId: 9403,
              },
              {
                Description: "2015 Audi A3 4 DR FWD",
                VehicleId: 9408,
              },
              {
                Description: "2015 Audi A3 C AWD",
                VehicleId: 9405,
              },
              {
                Description: "2015 Audi A3 C FWD",
                VehicleId: 9406,
              }
            ]
          });

        })
        .end(done);

    });

    it('should return empty response when searching for 2013 Ford Crown Victoria', (done) => {

      mocks.mockModelInfoRequest(2013, 'Ford', 'Crown Victoria', 200, responses["MODEL_INFO"]["2013_FORD_CROWN_VICTORIA"]);

      request(app)
        .get('/vehicles/2013/Ford/Crown%20Victoria?withRating=true')
        .expect(200)
        .expect((res) => {

          expect(res.body).toEqual({
            Count: 0,
            Results: []
          });

        })
        .end(done);

    });

    it('should return valid empty response even when the API returns an error code', (done) => {

      mocks.mockModelInfoRequest(2013, 'Some', 'Faulty Car', 400);

      request(app)
        .get('/vehicles/2013/Some/Faulty%20Car?withRating=true')
        .expect(200)
        .expect((res) => {

          expect(res.body).toEqual({
            Count: 0,
            Results: []
          });

        })
        .end(done);

    });

  });
  describe('POST /vehicles', () => {

    it('should return successful response when searching for 2015 Toyota Yaris', (done) => {

      mocks.mockModelInfoRequest(2015, 'Toyota', 'Yaris', 200, responses["MODEL_INFO"]["2015_TOYOTA_YARIS"]);

      request(app)
        .post('/vehicles')
        .expect(200)
        .send({
          modelYear: 2015,
          manufacturer: 'Toyota',
          model: 'Yaris'
        })
        .expect((res) => {

          expect(res.body).toEqual({
            Count: 2,
            Results: [
              {
                Description: '2015 Toyota Yaris 3 HB FWD',
                VehicleId: 9791,
              },
              {
                Description: '2015 Toyota Yaris Liftback 5 HB FWD',
                VehicleId: 9146
              },
            ]
          });

        })
        .end(done);

    });

    it('should return empty response when searching for 2013 Ford Crown Victoria', (done) => {

      mocks.mockModelInfoRequest(2013, 'Ford', 'Crown Victoria', 200, responses["MODEL_INFO"]["2013_FORD_CROWN_VICTORIA"]);

      request(app)
        .post('/vehicles')
        .send({
          modelYear: 2013,
          manufacturer: 'Ford',
          model: 'Crown Victoria'
        })
        .expect(200)
        .expect((res) => {

          expect(res.body).toEqual({
            Count: 0,
            Results: []
          });

        })
        .end(done);

    });

    it('should return valid empty response even when the API returns an error code', (done) => {

      mocks.mockModelInfoRequest(2013, 'Some', 'Faulty Car', 400);

      request(app)
        .post('/vehicles')
        .send({
          modelYear: 2013,
          manufacturer: 'Some',
          model: 'Faulty Car'
        })
        .expect(200)
        .expect((res) => {

          expect(res.body).toEqual({
            Count: 0,
            Results: []
          });

        })
        .end(done);

    });

  });

  describe('POST /vehicles', () => {

    it('should return successful response when searching for 2015 Audi A3', (done) => {

      mocks.mockModelInfoRequest(2015, 'Audi', 'A3', 200, responses["MODEL_INFO"]["2015_AUDI_A3"]);
      mocks.mockCrashRatingRequest(9403, 200, responses["CRASH_RATING"]["9403"]);
      mocks.mockCrashRatingRequest(9405, 200, responses["CRASH_RATING"]["9405"]);
      mocks.mockCrashRatingRequest(9406, 200, responses["CRASH_RATING"]["9406"]);
      mocks.mockCrashRatingRequest(9408, 200, responses["CRASH_RATING"]["9408"]);

      request(app)
        .post('/vehicles')
        .send({
          modelYear: 2015,
          manufacturer: 'Audi',
          model: 'A3',
          withRating: true
        })
        .expect(200)
        .expect((res) => {

          expect(res.body).toEqual({
            Count: 4,
            Results: [
              {
                Description: "2015 Audi A3 4 DR AWD",
                VehicleId: 9403,
                CrashRating: "5"
              },
              {
                Description: "2015 Audi A3 4 DR FWD",
                VehicleId: 9408,
                CrashRating: "5"
              },
              {
                Description: "2015 Audi A3 C AWD",
                VehicleId: 9405,
                CrashRating: "Not Rated"
              },
              {
                Description: "2015 Audi A3 C FWD",
                VehicleId: 9406,
                CrashRating: "Not Rated"
              }
            ]
          });

        })
        .end(done);

    });

    it('should not return crash rating info if withRating=false', (done) => {

      mocks.mockModelInfoRequest(2015, 'Audi', 'A3', 200, responses["MODEL_INFO"]["2015_AUDI_A3"]);
      mocks.mockCrashRatingRequest(9403, 200, responses["CRASH_RATING"]["9403"]);
      mocks.mockCrashRatingRequest(9405, 200, responses["CRASH_RATING"]["9405"]);
      mocks.mockCrashRatingRequest(9406, 200, responses["CRASH_RATING"]["9406"]);
      mocks.mockCrashRatingRequest(9408, 200, responses["CRASH_RATING"]["9408"]);

      request(app)
        .post('/vehicles')
        .send({
          modelYear: 2015,
          manufacturer: 'Audi',
          model: 'A3',
          withRating: false
        })
        .expect(200)
        .expect((res) => {

          expect(res.body).toEqual({
            Count: 4,
            Results: [
              {
                Description: "2015 Audi A3 4 DR AWD",
                VehicleId: 9403,
              },
              {
                Description: "2015 Audi A3 4 DR FWD",
                VehicleId: 9408,
              },
              {
                Description: "2015 Audi A3 C AWD",
                VehicleId: 9405,
              },
              {
                Description: "2015 Audi A3 C FWD",
                VehicleId: 9406,
              }
            ]
          });

        })
        .end(done);

    });

    it('should not return crash rating info if withRating=bananas', (done) => {

      mocks.mockModelInfoRequest(2015, 'Audi', 'A3', 200, responses["MODEL_INFO"]["2015_AUDI_A3"]);
      mocks.mockCrashRatingRequest(9403, 200, responses["CRASH_RATING"]["9403"]);
      mocks.mockCrashRatingRequest(9405, 200, responses["CRASH_RATING"]["9405"]);
      mocks.mockCrashRatingRequest(9406, 200, responses["CRASH_RATING"]["9406"]);
      mocks.mockCrashRatingRequest(9408, 200, responses["CRASH_RATING"]["9408"]);

      request(app)
        .post('/vehicles')
        .send({
          modelYear: 2015,
          manufacturer: 'Audi',
          model: 'A3',
          withRating: 'bananas'
        })
        .expect(200)
        .expect((res) => {

          expect(res.body).toEqual({
            Count: 4,
            Results: [
              {
                Description: "2015 Audi A3 4 DR AWD",
                VehicleId: 9403,
              },
              {
                Description: "2015 Audi A3 4 DR FWD",
                VehicleId: 9408,
              },
              {
                Description: "2015 Audi A3 C AWD",
                VehicleId: 9405,
              },
              {
                Description: "2015 Audi A3 C FWD",
                VehicleId: 9406,
              }
            ]
          });

        })
        .end(done);

    });

    it('should return empty response when searching for 2013 Ford Crown Victoria', (done) => {

      mocks.mockModelInfoRequest(2013, 'Ford', 'Crown Victoria', 200, responses["MODEL_INFO"]["2013_FORD_CROWN_VICTORIA"]);

      request(app)
        .post('/vehicles')
        .send({
          modelYear: 2013,
          manufacturer: 'Ford',
          model: 'Crown Victoria',
          withRating: true,
        })
        .expect(200)
        .expect((res) => {

          expect(res.body).toEqual({
            Count: 0,
            Results: []
          });

        })
        .end(done);

    });

    it('should return valid empty response even when the API returns an error code', (done) => {

      mocks.mockModelInfoRequest(2013, 'Some', 'Faulty Car', 400);

      request(app)
        .post('/vehicles')
        .send({
          modelYear: 2013,
          manufacturer: 'Some',
          model: 'Faulty Car',
          withRating: 'true'
        })
        .expect(200)
        .expect((res) => {

          expect(res.body).toEqual({
            Count: 0,
            Results: []
          });

        })
        .end(done);

    });

  });
  */
});