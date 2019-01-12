const querystring = require('querystring');
const fs = require('fs');

const Helper = require('./helper');

const host = 'www.datakick.org';
const version = '1';

// GET information about an item
function item(gtin) {
  return new Promise((resolve, reject) => {
    if (!gtin) {
      return reject(new ReferenceError('No GTIN or EAN specified'));
    }

    return Helper.request({
      hostname: host,
      path: `/api/items/${gtin}?version=${version}`,
      method: 'GET'
    }).then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  });
}

// updates an existing item
function update(gtin, options) {
  return new Promise((resolve, reject) => {
    if (!gtin) {
      return reject(new ReferenceError('No GTIN or EAN specified'));
    }
    if (!options || Object.keys(options).length === 0) {
      return reject(new ReferenceError('No fields to update specified'));
    }

    return Helper.request({
      hostname: host,
      path: `/api/items/${gtin}?version=${version}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }, querystring.stringify({
      options
    })).then((result) => {
      return resolve(result);
    }).catch((error) => {
      return reject(error);
    });
  });
}

// PUT a new item and check before if it really does not exist
function add(gtin, options) {
  return new Promise((resolve, reject) => {
    if (!gtin) {
      return reject(new ReferenceError('No GTIN or EAN specified'));
    }
    if (!options) {
      return reject(new ReferenceError('No fields to add specified'));
    }

    return item(gtin).then((data) => {
      if (typeof data.message != 'undefined') {
        return Helper.request({
          hostname: host,
          path: `/api/items/${gtin}?version=${version}`,
          method: 'PUT',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }, querystring.stringify({
          options
        })).then((result) => {
          return resolve(result);
        });
      } else {
        return reject(new Error('The item does already exist!'));
      }
    }).catch((error) => {
      return reject(error);
    });
  });
}

// GET a list of the first 100 items
function list() {
  return new Promise((resolve, reject) => {
    return Helper.request({
      hostname: host,
      path: `/api/items/?version=${version}`,
      method: 'GET'
    }).then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  });
}

// GET items by their page
function page(page) {
  return new Promise((resolve, reject) => {
    if (!page) {
      return reject(new ReferenceError('No page specified'));
    }

    return Helper.request({
      hostname: host,
      path: `/api/items/?page=${page}&version=${version}`,
      method: 'GET'
    }).then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  });
}

// GET items by a specified query
function query(query) {
  return new Promise((resolve, reject) => {
    if (!query) {
      return reject(new ReferenceError('No query specified'));
    }

    const queryString = querystring.stringify({
      query,
      version
    });

    return Helper.request({
      hostname: host,
      path: `/api/items/?${queryString}`,
      method: 'GET'
    }).then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  });
}

// POST a new image
function image(gtin, image) {
  return new Promise((resolve, reject) => {
    if (!gtin) {
      return reject(new ReferenceError('No GTIN or EAN specified'));
    }
    if (!fs.existsSync(image)) {
      return reject(new ReferenceError('The image does not exist!'));
    }

    return Helper.request({
      hostname: host,
      path: `/api/items/${gtin}/images/?version=${version}`,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }, fs.createReadStream(image)).then((result) => {
      return resolve(result);
    }).catch((error) => {
      return reject(error);
    });
  });
}

// Export the module
exports.item = item;

exports.update = update;
exports.add = add;

exports.list = list;

exports.page = page;

// exports.all = all;

exports.query = query;

exports.image = image;
