const chai = require('chai');

const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

const datakick = require('../index.js');


describe('datakick', function() {
  this.slow(1500);

  describe('#item()', function() {
    it('should return the data of an item without error', function(done) {
      datakick.item(4012200328002).then(function(data) {
        done();
      }).catch(function(error) {
        done(error);
      });
    });

    it('should return an error when the GTIN is not present', function() {
      return datakick.item().then(function(data) {
        return Promise.reject('Expected method to reject.');
      })
      .catch(function(error) {
        expect(error).to.be.an('error');
        expect(error).to.be.an.instanceof(ReferenceError);
      });
    });

    it('should return the GTIN14 if only a EAN8 was specified', function() {
      return datakick.item(29036158).then(function(data) {
        expect(data.gtin14).to.equal('00000029036158');
      });
    });
  });

  describe('#query()', function() {
    it('should return the data of a query without error', function(done) {
      datakick.query('Peanut Butter').then(function(data) {
        done();
      }).catch(function(error) {
        done(error);
      });
    });

    it('should return an error when the query is not present', function() {
      return datakick.query().then(function(data) {
        return Promise.reject('Expected method to reject.');
      })
      .catch(function(error) {
        expect(error).to.be.an('error');
        expect(error).to.be.an.instanceof(ReferenceError);
      });
    });

    it('should return a JSON array with the correct items', function() {
      return datakick.query('Peanut Butter').then(function(data) {
        expect(data).to.be.an('array');
        expect(data[0].name).to.include('Peanut Butter');
      });
    });
  });
});
