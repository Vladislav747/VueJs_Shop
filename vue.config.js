const path = require('path');

module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  //Чтобы использовать для github pages
  publicPath: process.env.NODE_ENV === 'production' ?
    '../dist/' :
    '/',
    
    outputDir:path.resolve(__dirname, '../dist/')
  
}