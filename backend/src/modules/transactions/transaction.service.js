import Transaction from './transaction.model'

async function getAllByUserId(userId) {
  return await Transaction.find({ userId: userId });
}

async function getAllByUserIdAndMonth(userId) {
  return await Transaction.find({ userId: userId });
}

async function getCurrentMonthBalanceByUserId(userId) {
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const transactionAmounts = await Transaction.find({
    userId: userId,
    executionDate: {
      $gte: firstDay,
      $lt: lastDay
    }
  }).select('amount');

  let totalBalance = 0;
  transactionAmounts.forEach(tr => {
    totalBalance = totalBalance + tr.amount;
  });
  return { balance: totalBalance };
}

async function getGeneralBalanceByUserId(userId) {
  const transactionAmounts = await Transaction.find({ userId: userId }).select('amount');

  let totalBalance = 0;
  transactionAmounts.forEach(tr => {
    totalBalance = totalBalance + tr.amount;
  });
  return { balance: totalBalance };
}

async function createOne(transaction) {
  return await transaction.save()
}

export { getAllByUserId, getAllByUserIdAndMonth, getCurrentMonthBalanceByUserId, getGeneralBalanceByUserId, createOne }