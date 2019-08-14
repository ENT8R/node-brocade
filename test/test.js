/* globals describe */
/* globals it */

const { expect } = require('chai');

const datakick = require('../index.js');
const querystring = require('../lib/querystring.js');
const request = require('../lib/request.js');

describe('datakick', function() {
  this.slow(2000);

  describe('#item()', () => {
    it('should return the data of an item without error', done => {
      datakick.item(4012200328002).then(() => done()).catch(done);
    });

    it('should return an error when the GTIN is incorrect', () => {
      return datakick.item(100).then(() =>
        Promise.reject(new Error('Expected method to reject.'))
      ).catch(error =>
        expect(error).to.be.an('error').and.to.be.an.instanceof(TypeError)
      );
    });

    it('should return an error when the GTIN is not present', () => {
      return datakick.item().then(() =>
        Promise.reject(new Error('Expected method to reject.'))
      ).catch(error =>
        expect(error).to.be.an('error').and.to.be.an.instanceof(TypeError)
      );
    });

    it('should return the GTIN14 if only a EAN8 was specified', () => {
      return datakick.item(29036158).then(data =>
        expect(data.gtin14).to.be.a('string').and.to.equal('00000029036158')
      );
    });
  });

  describe('#update()', () => {
    it('should update the data of an item without an error', done => {
      datakick.update('000000000000', { name: 'testname' }).then(() => done()).catch(done);
    });

    it('should return an error when the GTIN is incorrect', () => {
      return datakick.update(100, { name: 'Mini Color-Rado' }).then(() =>
        Promise.reject(new Error('Expected method to reject.'))
      ).catch(error =>
        expect(error).to.be.an('error').and.to.be.an.instanceof(TypeError)
      );
    });

    it('should return an error when the GTIN and the options are not present', () => {
      return datakick.update().then(() =>
        Promise.reject(new Error('Expected method to reject.'))
      ).catch(error =>
        expect(error).to.be.an('error').and.to.be.an.instanceof(TypeError)
      );
    });

    it('should return an error when the options are not present', () => {
      return datakick.update('000000000000').then(() =>
        Promise.reject(new Error('Expected method to reject.'))
      ).catch(error =>
        expect(error).to.be.an('error').and.to.be.an.instanceof(TypeError)
      );
    });

    it('should return an error when the options are empty', () => {
      return datakick.update('000000000000', {}).then(() =>
        Promise.reject(new Error('Expected method to reject.'))
      ).catch(error =>
        expect(error).to.be.an('error').and.to.be.an.instanceof(TypeError)
      );
    });
  });

  describe('#add()', () => {
    it('should return an error if the item does already exist', () => {
      datakick.add('000000000000', { name: 'testname' }).then(() =>
        Promise.reject(new Error('Expected method to reject.'))
      ).catch(error =>
        expect(error).to.be.an('error').and.to.be.an.instanceof(Error)
      );
    });

    it('should return an error when the GTIN is incorrect', () => {
      return datakick.add(100, { name: 'Mini Color-Rado' }).then(() =>
        Promise.reject(new Error('Expected method to reject.'))
      ).catch(error =>
        expect(error).to.be.an('error').and.to.be.an.instanceof(TypeError)
      );
    });

    it('should return an error when the GTIN and the options are not present', () => {
      return datakick.add().then(() =>
        Promise.reject(new Error('Expected method to reject.'))
      ).catch(error =>
        expect(error).to.be.an('error').and.to.be.an.instanceof(TypeError)
      );
    });

    it('should return an error when the options are not present', () => {
      return datakick.add('000000000000').then(() =>
        Promise.reject(new Error('Expected method to reject.'))
      ).catch(error =>
        expect(error).to.be.an('error').and.to.be.an.instanceof(TypeError)
      );
    });
  });

  describe('#list()', () => {
    it('should return the data without an error', done => {
      datakick.list().then(() => done()).catch(done);
    });
  });

  describe('#page()', () => {
    it('should return the data of a page without an error', done => {
      datakick.page(2).then(() => done()).catch(done);
    });

    it('should return an error when the page is not specified', () => {
      return datakick.page().then(() =>
        Promise.reject(new Error('Expected method to reject.'))
      ).catch(error =>
        expect(error).to.be.an('error').and.to.be.an.instanceof(TypeError)
      );
    });

    it('should return an error when the page does not exist', () => {
      return datakick.page(10000).then(() =>
        Promise.reject(new Error('Expected method to reject.'))
      ).catch(error =>
        expect(error).to.be.an('error')
      );
    });
  });

  describe('#query()', () => {
    it('should return the data of a query without error', done => {
      datakick.query('Peanut Butter').then(() => done()).catch(done);
    });

    it('should return an error when the query is not specified', () => {
      return datakick.query().then(() =>
        Promise.reject(new Error('Expected method to reject.'))
      ).catch(error =>
        expect(error).to.be.an('error').and.to.be.an.instanceof(TypeError)
      );
    });

    it('should return a JSON array with the correct items', () => {
      return datakick.query('Peanut Butter').then(data => {
        expect(data).to.be.an('array');
        expect(data[0].name.toLowerCase()).to.include('peanut butter');
      });
    });
  });

  describe('#image()', () => {
    it('should return an error when the GTIN and the image path are not present', () => {
      return datakick.image().then(() =>
        Promise.reject(new Error('Expected method to reject.'))
      ).catch(error =>
        expect(error).to.be.an('error').and.to.be.an.instanceof(TypeError)
      );
    });

    it('should return an error when the image is not specified', () => {
      return datakick.image('000000000000').then(() =>
        Promise.reject(new Error('Expected method to reject.'))
      ).catch(error => {
        expect(error).to.be.an('error').and.to.be.an.instanceof(TypeError);
      });
    });

    it('should return an error when the image does not exist', () => {
      return datakick.image('000000000000', 'path/to/image.jpg').then(() =>
        Promise.reject(new Error('Expected method to reject.'))
      ).catch(error =>
        expect(error).to.be.an('error').and.to.be.an.instanceof(TypeError)
      );
    });
  });
});

describe('querystring', () => {
  it('should return the correct query string', () =>
    expect(querystring({
      data: 'test with spaces',
      version: 1
    })).to.be.a('string').and.to.equal('data=test%20with%20spaces&version=1')
  );
});

describe('request', function() {
  this.slow(2000);

  it('should return an error when the URL is not present', () => {
    return request().then(() =>
      Promise.reject(new Error('Expected method to reject.'))
    ).catch(error =>
      expect(error).to.be.an('error').and.to.be.an.instanceof(TypeError)
    );
  });

  it('should return an error when the page could not be loaded', () => {
    return request('https://www.datakick.org/items/api/000000000000?version=1').then(() =>
      Promise.reject(new Error('Expected method to reject.'))
    ).catch(error =>
      expect(error).to.be.an('error').and.to.be.an.instanceof(Error)
    );
  });

  it('should return an error when the page does not exist', () => {
    return request('https://www.datakik.org/api/items/000000000000?version=1').then(() =>
      Promise.reject(new Error('Expected method to reject.'))
    ).catch(error =>
      expect(error).to.be.an('object').and.to.include({
        errno: 'ENOTFOUND',
        code: 'ENOTFOUND'
      })
    );
  });

});
