const path = require('path');

module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'datakick.min.js',
    library: 'datakick',
    libraryTarget: 'umd'
  },
  node: {
    fs: 'empty'
  }
};
