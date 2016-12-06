'use strict'
/**
 * Created by 藤蔓 on 2016/09/19.
 */
const env = require("./f2eci").env;
var configMap = {
  "dev": ()=>require("./webpack/webpack.dev.config"),
  "beta": ()=>require("./webpack/webpack.beta.config"),
  "ppe": ()=>require("./webpack/webpack.product.config"),
  "product": ()=>require("./webpack/webpack.product.config")
}
module.exports = configMap[env] && configMap[env]() || configMap.dev();