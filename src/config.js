require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: '花尖墨',
    description: '做云南最好的农产品电商平台.',
    head: {
      titleTemplate: '花尖墨: %s',
      meta: [
        {name: 'description', content: '做云南最好的农产品电商平台.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: '花尖墨'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: '花尖墨'},
        {property: 'og:description', content: '做云南最好的农产品电商平台.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@erikras'},
        {property: 'og:creator', content: '@erikras'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
