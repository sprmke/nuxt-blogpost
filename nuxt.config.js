const pkg = require('./package')
const bodyParser = require('body-parser');
const axios = require('axios');

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~assets/styles/main.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/components/core-components.js',
    '~plugins/filters/date-filters.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],

  axios: {
    baseURL: process.env.BASE_URL || 'https://nuxt-blog-sprmke.firebaseio.com'
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  env: {
    baseUrl: process.env.BASE_URL || 'https://nuxt-blog-sprmke.firebaseio.com',
    nbAPIKey: process.env.NB_API_KEY
  },
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  router: {
    // middleware: 'log'
  },
  serverMiddleware: [
    bodyParser.json(),
    '~/api'
  ],
  generate: {
    routes: function() {
      // prerender our dynamic posts pages
      // when deploying our app as static website
      return axios.get('https://nuxt-blog-sprmke.firebaseio.com/posts.json')
        .then(res => {
          const routes = [];
          for (const key in res.data) {
            // pass the route and payload to prevent redudant request
            // on posts/:id component
            routes.push({
              route: `/posts/${key}`,
              payload: { postData: res.data[key]} 
            });
          }
          return routes;
        });
    }
  }
}
