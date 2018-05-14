const request = require('request');
const querystring = require('querystring');
const fs = require('fs');

const Helper = require('./helper');

const host = 'https://www.datakick.org';
const version = '1';

// GET information about an item
function item(gtin) {
  return new Promise((resolve, reject) => {
    if (!gtin) {
      return reject(new ReferenceError('No GTIN or EAN specified'));
    }

    return Helper.get(`${host}/api/items/${gtin}?version=${version}`).then((result) => {
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
    if (!options) {
      return reject(new ReferenceError('No fields to update specified'));
    }

    return request.put({
      url: `${host}/api/items/${gtin}?version=${version}`,
      form: options
    }, (error, response, body) => {
      if (error) {
        return reject(error);
      }
      return resolve(JSON.parse(body));
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
        request.put({
          url: `${host}/api/items/${gtin}?version=${version}`,
          form: options
        }, (error, response, body) => {
          if (error) {
            return reject(error);
          }
          return resolve(JSON.parse(body));
        });
      } else {
        reject(new Error('The item does already exist!'));
      }
    });
  });
}

// GET a list of the first 100 items
function list() {
  return new Promise((resolve, reject) => {
    // TODO: the method Helper.get(); fails here...
    request(`${host}/api/items/?version=${version}`, (error, response, body) => {
      if (error) {
        return reject(error);
      }
      return resolve(JSON.parse(body));
    });
    /* return Helper.get(`${host}/api/items/?version=${version}`).then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });*/
  });
}

// GET items by their page
function page(page) {
  return new Promise((resolve, reject) => {
    if (!page) {
      return reject(new ReferenceError('No page specified'));
    }

    return Helper.get(`${host}/api/items/?page=${page}&version=${version}`).then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  });
}

/* function all() {
  return getAll(`${host}/api/items?version=${version}`);
}
function getAll(url) {
  return new Promise((resolve, reject) => {
    request(url, function(error, response, body) {
      if (error) return reject(error);
      const links = parseHeader(response.headers['link']);
      if (links.next != null) {
        getAll(links.next).then(function(data, error) {
          resolve(Object.assign(JSON.parse(body), JSON.parse(data)));
        });
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
}
function parseHeader(header) {
  let link = {};
  const links = header.replace(/ /g, '').split(',');
  for (let i = 0; i < links.length; i++) {
    const parts = links[i].match(/<(.+)>; *rel="(.+)"/);
    link[parts[2]] = parts[1];
  }
  return link;
}*/

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

    return Helper.get(`${host}/api/items/?${queryString}`).then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  });
}

// POST a new image
function image(gtin, image) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(image)) {
      return reject(new Error('The image does not exist!'));
    }

    return request.post({
      url: `${host}/api/items/${gtin}/images/?version=${version}`,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      formData: {
        image: fs.createReadStream(image),
      }
    }, (error, response, body) => {
      if (error) {
        return reject(error);
      }
      return resolve(JSON.parse(body));
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
