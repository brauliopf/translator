const webpack = require('webpack');
const path = require('path');
require('dotenv').config();

module.exports = {
    entry: './src/index.js',
    output: {
        filename: './bundle.js',
        path: path.resolve(__dirname, './src/dist'),
    },
    plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            // https://nodejs.org/api/process.html#process_process_env
            OPENAI_API_KEY: JSON.stringify(process.env.OPENAI_API_KEY),
          }
        })
    ],
    mode: 'development'
};