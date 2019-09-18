const keystone = require('keystone')
const Types = keystone.Field.Types

const User = new keystone.List('User')

User.add({
  displayName: {
    type: String
  },
  email: {
    type: Types.Email,
    unique: true,
    required: true,
    initial: true
  },
  password: {
    type: Types.Password
  }
})

User.schema.virtual('canAccessKeystone').get(() => true)

User.register()

export default User
