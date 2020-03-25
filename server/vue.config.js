const path = require('path');

module.exports = {
  // devServer: {
  //   proxy: 'https://vue-taskmanager.herokuapp.com/'
  // },
  configureWebpack: {
    devtool: 'source-map'
  },
  publicPath: process.env.NODE_ENV === 'production' ?
    '../dist/' :
    '/',
    
    outputDir:path.resolve(__dirname, '../dist/')
  
}