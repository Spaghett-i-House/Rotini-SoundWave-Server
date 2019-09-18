const keystone = require('keystone')

keystone.init({
  'name': process.env.APP_NAME || 'KeystoneTS',
  'cookie secret': process.env.COOKIE_SECRET || 'cookie-secret',

  'mongo': process.env.MONGO_URI || 'mongodb://db/keystone',

  'user model': 'User',
  'auto update': true,
  'auth': true,

  'views': 'pages',
  'view engine': 'pug',

  'static': [ 'public' ]
})

keystone.import('models')

keystone.set('routes', require('./routes'))

keystone.start()
