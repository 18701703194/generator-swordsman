/**
 * Created by madlord on 16/1/14.
 */

"use strict";
let config = require('./webpack.base.config.js');
const url = require('url');
const urlPrefix = require("../f2eci").urlPrefix;
const STATIC_SRC = require("../f2eci")["static-src"];

config.output.publicPath = url.resolve(urlPrefix, STATIC_SRC) + '/',
  module.exports = config;


