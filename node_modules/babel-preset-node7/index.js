/* global module */
module.exports = {
  plugins: [
    require('babel-plugin-syntax-trailing-function-commas'),
    require('babel-plugin-transform-es2015-modules-commonjs'),
    require('babel-plugin-syntax-async-functions'),
    require('babel-plugin-transform-class-properties'),
    require('babel-plugin-transform-object-rest-spread'),
  ],
};
