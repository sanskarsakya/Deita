const path = require('path');
const webpack = require('webpack')
// const BytenodeWebpackPlugin = require('bytenode-webpack-plugin');

console.log(__dirname);
let common_config = {
  node: {
    __dirname: true
  },
  mode: process.env.ENV || 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [
          // /node_modules/,
          path.resolve(__dirname, "src/ui")
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
};

module.exports = [
  Object.assign({}, common_config, {
    target: 'electron-main',
    entry: {
      renderrer: './src/main.ts',
    },
    output: {
      libraryTarget: 'commonjs2',
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build')
    },
    plugins: [
      new webpack.NormalModuleReplacementPlugin(/\.\.\/migrate/, "node-noop"),
      new webpack.NormalModuleReplacementPlugin(/\.\.\/seed/, "node-noop")
    ],
    node: {
      __dirname: false,
      __filename: false
    },
    externals: [
      /(node_modules|main\..*\.js)/,
      'knex',
      'sqlite3',
      'swagger-jsdoc',
      'swagger-ui-express',
      'node-excel-export',
      '@journeyapps/sqlcipher'
    ],
  }),
  // Object.assign({}, common_config, {
  //   target: 'electron-renderer',
  //   entry: {
  //     ui: './src/renderer/index.ts',
  //   },
  //   output: {
  //     filename: '[name]-bundle.js',
  //     path: path.resolve(__dirname, 'src/renderer/dist')
  //   },
  // })
]
