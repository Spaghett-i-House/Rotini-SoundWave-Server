exports.create = {
  User: [
    {
      displayName: 'Admin User',
      email: process.env.USER_EMAIL || 'admin@keystone.com',
      password: process.env.USER_PASSWORD || 'password'
    }
  ]
}
