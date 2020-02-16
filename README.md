# ⚠️ datakick.org shut down on March 31, 2020 ⚠️

# datakick

[![dependencies status](https://david-dm.org/ent8r/datakick/status.svg)](https://david-dm.org/ent8r/datakick)
[![travis](https://travis-ci.org/ENT8R/datakick.svg?branch=master)](https://travis-ci.org/ENT8R/datakick)
[![npm version](http://img.shields.io/npm/v/datakick.svg)](https://www.npmjs.org/package/datakick)
[![npm downloads](https://img.shields.io/npm/dt/datakick.svg)](https://www.npmjs.org/package/datakick)
[![coverage Status](https://coveralls.io/repos/github/ENT8R/datakick/badge.svg?branch=master)](https://coveralls.io/github/ENT8R/datakick?branch=master)


> Module for making requests to the [Datakick API](https://www.datakick.org/api)

## Installation

### npm
```
npm install datakick --save
```

### unpkg
```
<script src="https://unpkg.com/datakick@1.2.0/dist/datakick.min.js"></script>
```

## Usage

```javascript
const datakick = require('datakick');

datakick.item('4335896051932').then(data => {
  console.log(JSON.stringify(data));
}).catch(error => {
  console.log(error.message);
});
```

## Features

### Get an item by its GTIN

```javascript
datakick.item('4335896051932').then(data => {
  console.log(JSON.stringify(data));
}).catch(error => {
  console.log(error.message);
});
```

### Update an existing item

```javascript
datakick.update('000000000000', {
  name: 'Test',
  brand_name: 'Test Brand'
}).then(data => {
  console.log(JSON.stringify(data));
}).catch(error => {
  console.log(error.message);
});
```

### Add a new item

```javascript
datakick.add('000000000000', {
  name: 'Test',
  brand_name: 'Test Brand'
}).then(data => {
  console.log(JSON.stringify(data));
}).catch(error => {
  console.log(error.message);
});
```

### List the first 100 products

```javascript
datakick.list().then(data => {
  console.log(JSON.stringify(data));
}).catch(error => {
  console.log(error.message);
});
```

### List all items of a specific page

```javascript
datakick.page('20').then(data => {
  console.log(JSON.stringify(data));
}).catch(error => {
  console.log(error.message);
});
```

### Search for items

```javascript
datakick.query('peanut butter').then(data => {
  console.log(JSON.stringify(data));
}).catch(error => {
  console.log(error.message);
});
```

### Upload an image

```javascript
datakick.image('000000000000', 'image.jpg').then(data => {
  console.log(JSON.stringify(data));
}).catch(error => {
  console.log(error.message);
});
```

## License

[GPL-3.0](https://github.com/ENT8R/datakick/blob/master/LICENSE)
