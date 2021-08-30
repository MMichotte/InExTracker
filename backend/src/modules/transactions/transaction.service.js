import Transaction from './transaction.model'

async function getAllByUserId(userId) {
return await Transaction.find({userId: userId});
}

async function createOne(transaction) {
  return await transaction.save()
}

export { getAllByUserId, createOne }