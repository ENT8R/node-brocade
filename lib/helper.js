const https = require('https');

function get(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      // handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error(`Failed to load page, status code: ${response.statusCode}`));
      }
      const body = [];
      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => {
        return resolve(JSON.parse(body.toString('utf8')));
      });
    });
    request.on('error', (error) => reject(error));
  });
}

exports.get = get;
