const https = require('https');

function request(options, data) {
  return new Promise((resolve, reject) => { // eslint-disable-line consistent-return
    if (!options) {
      return reject(new ReferenceError('No options specified!'));
    }

    const req = https.request(options, (res) => { // eslint-disable-line consistent-return
      res.setEncoding('utf8');

      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        body = body.toString();
        if (res.statusCode < 200 || res.statusCode > 299) {
          switch (res.statusCode) {
          case 400:
            return reject(new TypeError(`Failed to retrieve item: ${JSON.parse(body).message}`));
          default:
            return reject(new Error(`Failed to load page, status code: ${res.statusCode}`));
          }
        }
        return resolve(JSON.parse(body));
      });
    });

    req.on('error', (error) => {
      return reject(error);
    });

    // write data to request body
    if ((options.method === 'POST' || options.method === 'PUT') && data !== null) {
      req.write(data);
    }
    req.end();
  });
}

exports.request = request;
