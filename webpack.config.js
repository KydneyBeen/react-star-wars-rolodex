const path = require('path');

module.exports = {
  mode: 'production',
  entry: './dist/public/scripts/app.js',
  output: {
    path: path.resolve(__dirname, 'dist/public/scripts'),
    filename: 'app.bundle.js',
  },
};