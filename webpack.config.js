const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const root = (...filesOrDirs) => path.resolve('.', ...filesOrDirs)

const src = (...filesOrDirs) => path.join(root('src'), ...filesOrDirs)

const dist = (...filesOrDirs) => path.join(root('dist'), ...filesOrDirs)

function createConfig (target) {
  return {
    entry: src('index.js'),
    mode: 'production',
    target,
    output: {
      path: dist(),
      filename: `maybe.${target}.js`,
      library: 'maybe'
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
      ]
    },
    plugins: [
      new CleanWebpackPlugin()
    ]
  }
}

module.exports = [createConfig('node'), createConfig('web')]
