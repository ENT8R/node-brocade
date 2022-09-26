module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    filename: 'main.min.js',
    library: {
      name: 'node-brocade',
      type: 'umd'
    }
  },
  resolve: {
    fallback: {
      fs: false
    }
  }
};
