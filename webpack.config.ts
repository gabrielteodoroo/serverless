const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  externals: [nodeExternals({
    allowlist: ['pg', 'pg-hstore', 'knex']

  })],
  entry: {
    'create-user': './src/create-user.ts',
    'list-users': './src/list-users.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '.webpack'),
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
