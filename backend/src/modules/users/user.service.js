import User from './user.model'

async function findOneByEmail(email) {
  return await User.findOne({ email: email });
}

async function findOneById(id) {
  return await User.findById(id)
}

async function createOne(user) {
  return await user.save()
}

export { findOneByEmail, findOneById, createOne }