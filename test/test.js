/* globals describe */
/* globals it */

const chai = require('chai');

// const assert = chai.assert;
const expect = chai.expect;
// const should = chai.should();

const datakick = require('../index.js');

const Helper = require('../lib/helper.js');


describe('datakick', function() {
  this.slow(1500);

  describe('#item()', () => {
    it('should return the data of an item without error', (done) => {
      datakick.item(4012200328002).then(() => {
        done();
      }).catch((error) => {
        done(error);
      });
    });

    it('should return an error when the GTIN is not present', () => {
      return datakick.item().then(() => {
        return Promise.reject(new Error('Expected method to reject.'));
      }).catch((error) => {
        expect(error).to.be.an('error');
        expect(error).to.be.an.instanceof(ReferenceError);
      });
    });

    it('should return the GTIN14 if only a EAN8 was specified', () => {
      return datakick.item(29036158).then((data) => {
        expect(data.gtin14).to.equal('00000029036158');
      });
    });
  });

  describe('#update()', () => {
    it('should update the data of an item without an error', (done) => {
      datakick.update('000000000000', { name: 'testname' }).then(() => {
        done();
      }).catch((error) => {
        done(error);
      });
    });

    it('should return an error when the GTIN and the options are not present', () => {
      return datakick.update().then(() => {
        return Promise.reject(new Error('Expected method to reject.'));
      }).catch((error) => {
        expect(error).to.be.an('error');
        expect(error).to.be.an.instanceof(ReferenceError);
      });
    });

    it('should return an error when the options are not present', () => {
      return datakick.update('000000000000').then(() => {
        return Promise.reject(new Error('Expected method to reject.'));
      }).catch((error) => {
        expect(error).to.be.an('error');
        expect(error).to.be.an.instanceof(ReferenceError);
      });
    });
  });

  describe('#add()', () => {
    it('should return an error if the item does already exist', () => {
      datakick.add('000000000000', { name: 'testname' }).then(() => {
        return Promise.reject(new Error('Expected method to reject.'));
      }).catch((error) => {
        expect(error).to.be.an('error');
        expect(error).to.be.an.instanceof(Error);
      });
    });

    it('should return an error when the GTIN and the options are not present', () => {
      return datakick.add().then(() => {
        return Promise.reject(new Error('Expected method to reject.'));
      }).catch((error) => {
        expect(error).to.be.an('error');
        expect(error).to.be.an.instanceof(ReferenceError);
      });
    });

    it('should return an error when the options are not present', () => {
      return datakick.add('000000000000').then(() => {
        return Promise.reject(new Error('Expected method to reject.'));
      }).catch((error) => {
        expect(error).to.be.an('error');
        expect(error).to.be.an.instanceof(ReferenceError);
      });
    });
  });

  describe('#list()', () => {
    it('should return the data without an error', (done) => {
      datakick.list().then(() => {
        done();
      }).catch((error) => {
        done(error);
      });
    });
  });

  describe('#page()', () => {
    it('should return the data of a page without an error', (done) => {
      datakick.page(2).then(() => {
        done();
      }).catch((error) => {
        done(error);
      });
    });

    it('should return an error when the page is not specified', () => {
      return datakick.page().then(() => {
        return Promise.reject(new Error('Expected method to reject.'));
      }).catch((error) => {
        expect(error).to.be.an('error');
        expect(error).to.be.an.instanceof(ReferenceError);
      });
    });
  });

  describe('#query()', () => {
    it('should return the data of a query without error', (done) => {
      datakick.query('Peanut Butter').then(() => {
        done();
      }).catch((error) => {
        done(error);
      });
    });

    it('should return an error when the query is not specified', () => {
      return datakick.query().then(() => {
        return Promise.reject(new Error('Expected method to reject.'));
      }).catch((error) => {
        expect(error).to.be.an('error');
        expect(error).to.be.an.instanceof(ReferenceError);
      });
    });

    it('should return a JSON array with the correct items', () => {
      return datakick.query('Peanut Butter').then((data) => {
        expect(data).to.be.an('array');
        expect(data[0].name).to.include('Peanut Butter');
      });
    });
  });

  describe('#image()', () => {
    it('should return an error when the GTIN and the image path are not present', () => {
      return datakick.image().then(() => {
        return Promise.reject(new Error('Expected method to reject.'));
      }).catch((error) => {
        expect(error).to.be.an('error');
        expect(error).to.be.an.instanceof(ReferenceError);
      });
    });

    it('should return an error when the image is not specified', () => {
      return datakick.image('000000000000').then(() => {
        return Promise.reject(new Error('Expected method to reject.'));
      }).catch((error) => {
        expect(error).to.be.an('error');
        expect(error).to.be.an.instanceof(ReferenceError);
      });
    });

    it('should return an error when the image does not exist', () => {
      return datakick.image('000000000000', 'path/to/image.jpg').then(() => {
        return Promise.reject(new Error('Expected method to reject.'));
      }).catch((error) => {
        expect(error).to.be.an('error');
        expect(error).to.be.an.instanceof(ReferenceError);
      });
    });
  });
});

describe('Helper', function() {
  this.slow(1500);

  describe('#request', () => {
    it('should return an error when the options object is not present', () => {
      return Helper.request().then(() => {
        return Promise.reject(new Error('Expected method to reject.'));
      }).catch((error) => {
        expect(error).to.be.an('error');
        expect(error).to.be.an.instanceof(ReferenceError);
      });
    });
  });

  describe('#request', () => {
    it('should return an error when the page could not be loaded', () => {
      return Helper.request({
        hostname: 'www.datakick.org',
        path: '/items/api/000000000000?version=1',
        method: 'GET'
      }).then(() => {
        return Promise.reject(new Error('Expected method to reject.'));
      }).catch((error) => {
        expect(error).to.be.an('error');
        expect(error).to.be.an.instanceof(Error);
      });
    });
  });

});
