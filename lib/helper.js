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
        let parsed;
        try {
          parsed = JSON.parse(body.toString());
        } catch (error) {
          return reject(new Error('Could not parse JSON!'));
        }
        if (res.statusCode < 200 || res.statusCode > 299) {
          if (parsed === null && parsed.message === null) {
            return reject(new Error(`Failed to load page, status code: ${res.statusCode}`));
          }
        }
        return resolve(parsed);
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
