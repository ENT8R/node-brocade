# brocade

![test](https://github.com/ENT8R/node-brocade/actions/workflows/test.yml/badge.svg?branch=master)
[![npm version](http://img.shields.io/npm/v/node-brocade.svg)](https://www.npmjs.org/package/node-brocade)
[![npm downloads](https://img.shields.io/npm/dt/node-brocade.svg)](https://www.npmjs.org/package/node-brocade)
[![coverage](https://coveralls.io/repos/github/ENT8R/node-brocade/badge.svg?branch=master)](https://coveralls.io/github/ENT8R/node-brocade?branch=master)


> Module for making requests to the [Brocade API](https://www.brocade.io/documentation)

## Installation

### npm
```
npm install node-brocade --save
```

### unpkg
```
<script src="https://unpkg.com/node-brocade@2.0.1/dist/main.min.js"></script>
```

## Usage

```javascript
const brocade = require('node-brocade');

brocade.item('4335896051932').then(data => {
  console.log(JSON.stringify(data));
}).catch(error => {
  console.log(error.message);
});
```

## Features

### Get an item by its GTIN

```javascript
brocade.item('4335896051932').then(data => {
  console.log(JSON.stringify(data));
}).catch(error => {
  console.log(error.message);
});
```

<!--### Update an existing item

```javascript
brocade.update('000000000000', {
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
brocade.add('000000000000', {
  name: 'Test',
  brand_name: 'Test Brand'
}).then(data => {
  console.log(JSON.stringify(data));
}).catch(error => {
  console.log(error.message);
});
```-->

### List the first 100 products

```javascript
brocade.list().then(data => {
  console.log(JSON.stringify(data));
}).catch(error => {
  console.log(error.message);
});
```

### List all items of a specific page

```javascript
brocade.page('20').then(data => {
  console.log(JSON.stringify(data));
}).catch(error => {
  console.log(error.message);
});
```

### Search for items

```javascript
brocade.query('peanut butter').then(data => {
  console.log(JSON.stringify(data));
}).catch(error => {
  console.log(error.message);
});
```

<!--### Upload an image

```javascript
brocade.image('000000000000', 'image.jpg').then(data => {
  console.log(JSON.stringify(data));
}).catch(error => {
  console.log(error.message);
});
```-->

## License

[GPL-3.0](https://github.com/ENT8R/node-brocade/blob/master/LICENSE)
