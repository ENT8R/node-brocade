# datakick

[![dependencies Status](https://david-dm.org/ent8r/datakick/status.svg)](https://david-dm.org/ent8r/datakick) [![Travis](https://travis-ci.org/ENT8R/datakick.svg?branch=master)](https://travis-ci.org/ENT8R/datakick) [![NPM Version](http://img.shields.io/npm/v/datakick.svg)](https://www.npmjs.org/package/datakick) [![NPM Downloads](https://img.shields.io/npm/dt/datakick.svg)](https://www.npmjs.org/package/datakick) [![Coverage Status](https://coveralls.io/repos/github/ENT8R/datakick/badge.svg?branch=master)](https://coveralls.io/github/ENT8R/datakick?branch=master)[![Code Climate](https://img.shields.io/codeclimate/maintainability-percentage/ENT8R/datakick.svg)](https://codeclimate.com/github/ENT8R/datakick) [![npm](https://img.shields.io/npm/l/datakick.svg)](https://www.gnu.org/licenses/gpl-3.0.html)
[![Github file size](https://img.shields.io/github/size/ENT8R/datakick/index.min.js.svg)](https://github.com/ENT8R/datakick/blob/master/index.min.js)


NodeJS module for making requests to the [Datakick API](https://www.datakick.org/api)

## Installation

```
npm install datakick --save
```

## Usage

```javascript
const datakick = require('datakick');

datakick.item('4335896051932').then(function(data) {
  console.log(JSON.stringify(data));
}).catch(function(error) {
  console.log(error.message);
});
```

## Features

### Get an item by its GTIN

```javascript
datakick.item('4335896051932').then(function(data) {
  console.log(JSON.stringify(data));
}).catch(function(error) {
  console.log(error.message);
});
```

### Update an existing item

```javascript
datakick.update('000000000000', {
  name: 'Test',
  brand_name: 'Test Brand'
}).then(function(data) {
  console.log(JSON.stringify(data));
}).catch(function(error) {
  console.log(error.message);
});
```

### Add a new item

```javascript
datakick.add('000000000000', {
  name: 'Test',
  brand_name: 'Test Brand'
}).then(function(data) {
  console.log(JSON.stringify(data));
}).catch(function(error) {
  console.log(error.message);
});
```

### List the first 100 products

```javascript
datakick.list().then(function(data) {
  console.log(JSON.stringify(data));
}).catch(function(error) {
  console.log(error.message);
});
```

### List all items of a specific page

```javascript
datakick.page('20').then(function(data) {
  console.log(JSON.stringify(data));
}).catch(function(error) {
  console.log(error.message);
});
```

### Search for items

```javascript
datakick.query('peanut butter').then(function(data) {
  console.log(JSON.stringify(data));
}).catch(function(error) {
  console.log(error.message);
});
```

### Upload an image

```javascript
datakick.image('000000000000', 'image.jpg').then(function(data) {
  console.log(JSON.stringify(data));
}).catch(function(error) {
  console.log(error.message);
});
```

## License

[GPL-3.0](https://github.com/ENT8R/datakick/blob/master/LICENSE)
