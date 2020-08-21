const path = require('path');

module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  publicPath: process.env.NODE_ENV === 'production' ?
    '../dist/' :
    '/',
    
    outputDir:path.resolve(__dirname, 'vuejs_shop','../dist/')
  
}