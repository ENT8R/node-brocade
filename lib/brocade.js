const fs = require('fs');

const request = require('./request');
const querystring = require('./querystring');

const host = 'https://www.brocade.io';
const version = '1';

// GET information about an item
function item(gtin) {
  return new Promise((resolve, reject) => {
    if (!gtin) {
      return reject(new TypeError('No GTIN or EAN specified'));
    }

    return request(`${host}/api/items/${gtin}?version=${version}`).then(resolve).catch(reject);
  });
}

/* // updates an existing item
function update(gtin, options) {
  return new Promise((resolve, reject) => {
    if (!gtin) {
      return reject(new TypeError('No GTIN or EAN specified'));
    }
    if (!options || Object.keys(options).length === 0) {
      return reject(new TypeError('No fields to update specified'));
    }

    return request(`${host}/api/items/${gtin}?version=${version}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: querystring(options)
    }).then(resolve).catch(reject);
  });
}

// PUT a new item and check before if it really does not exist
function add(gtin, options) {
  return new Promise((resolve, reject) => {
    if (!gtin) {
      return reject(new TypeError('No GTIN or EAN specified'));
    }
    if (!options || Object.keys(options).length === 0) {
      return reject(new TypeError('No fields to add specified'));
    }

    return item(gtin).then(data => {
      if (typeof data.message == 'undefined') {
        reject(new Error('The item does already exist!'));
      }
    }).catch(error => {
      // If an item does not exist, a 404 status code is returned, so the main part has to be in the catch-block
      if (error.constructor.name === 'NotFoundError') {
        return request(`${host}/api/items/${gtin}?version=${version}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: querystring(options)
        }).then(resolve);
      } else {
        return reject(error);
      }
    });
  });
}*/

// GET a list of the first 100 items
function list() {
  return new Promise((resolve, reject) => {
    return request(`${host}/api/items/?version=${version}`).then(resolve).catch(reject);
  });
}

// GET items by their page
function page(page) {
  return new Promise((resolve, reject) => {
    if (!page) {
      return reject(new TypeError('No page specified'));
    }

    return request(`${host}/api/items/?page=${page}&version=${version}`).then(resolve).catch(reject);
  });
}

// GET items by a specified query
function query(query) {
  return new Promise((resolve, reject) => {
    if (!query) {
      return reject(new TypeError('No query specified'));
    }

    const qs = querystring({
      query,
      version
    });

    return request(`${host}/api/items/?${qs}`).then(resolve).catch(reject);
  });
}

// POST a new image
function image(gtin, image) {
  return new Promise((resolve, reject) => {
    if (!gtin) {
      return reject(new TypeError('No GTIN or EAN specified'));
    }
    if (!fs.existsSync(image)) {
      return reject(new TypeError('The image does not exist!'));
    }

    return request(`${host}/api/items/${gtin}/images/?version=${version}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: fs.createReadStream(image)
    }).then(resolve).catch(reject);
  });
}

module.exports = {
  item,
  /* update,
  add,*/
  list,
  page,
  query,
  image
};
