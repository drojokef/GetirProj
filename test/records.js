process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();


chai.use(chaiHttp);

describe('Records', () => {
  
  describe('/POST record', () => {
      it('it should not POST a record without body fields', (done) => {
          let record = {
      "startDate": "2016-01-26",
      "endDate": "2018-02-02",
      "minCount": 1800,
      "maxCount": 3000
          }
        chai.request(server)
            .post('/getir/records')
            .send(record)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.should.be.json;
                   res.body.should.be.a('object');
              done();
            });
      });

  });
});
