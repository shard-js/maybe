const path = require('path')

const root = (...filesOrDirs) => path.resolve('.', ...filesOrDirs)

const src = (...filesOrDirs) => path.join(root('src'), ...filesOrDirs)

const dist = (...filesOrDirs) => path.join(root('dist'), ...filesOrDirs)

module.exports = () => ({
  entry: src('index.js'),
  mode: 'production',
  output: {
    path: dist(),
    filename: 'maybe.js',
    library: 'maybe',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
})
