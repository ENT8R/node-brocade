const fetch = require('isomorphic-unfetch');

class NotFoundError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, NotFoundError);
  }
}

module.exports = (url, options) => {
  return new Promise((resolve, reject) => { // eslint-disable-line consistent-return
    if (!url) {
      return reject(new TypeError('No URL specified!'));
    }

    fetch(url, options)
      .then(response => {
        if (!response.ok) { // !response.ok is equal to response.status < 200 || response.status > 299
          switch (response.status) {
          case 400:
            // Datakick returns a 400 error in case the barcode is in a wrong format
            return reject(new TypeError('Failed to retrieve item'));
          case 404:
            return reject(new NotFoundError('Item could not be found'));
          default:
            return reject(new Error(`Failed to load page, status code: ${response.status}`));
          }
        }
        return response.json();
      })
      .then(resolve)
      .catch(reject);
  });
};
