import User from './user.model'

async function findOneByEmail(email) {
  return await User.findOne({ email: email });
}

async function createOneUser(user) {
  return await user.save()
}

export { findOneByEmail, createOneUser }