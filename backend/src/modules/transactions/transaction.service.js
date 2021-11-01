import Transaction from './transaction.model'

async function getAllByUserId(userId) {
  return await Transaction.find({ userId: userId });
}

async function getAllByUserIdAndMonth(userId, yearMonth) {
  const date = yearMonth.split('-');
  date[1] = +date[1] - 1;
  const firstDay = new Date(+date[0], date[1], 1);
  const lastDay = new Date(+date[0], date[1] + 1, 1);

  return await Transaction.find({
    userId: userId,
    executionDate: {
      $gt: firstDay,
      $lte: lastDay
    }
  });
}

async function getCurrentMonthBalanceByUserId(userId, yearMonth) {
  const date = yearMonth.split('-');
  date[1] = +date[1] - 1;
  const firstDay = new Date(+date[0], date[1], 1);
  const lastDay = new Date(+date[0], date[1] + 1, 1);

  const transactionAmounts = await Transaction.find({
    userId: userId,
    executionDate: {
      $gt: firstDay,
      $lte: lastDay
    }
  }).select('amount');

  let totalBalance = 0;
  transactionAmounts.forEach(tr => {
    totalBalance = totalBalance + tr.amount;
  });
  return { balance: totalBalance };
}

async function getGeneralBalanceByUserId(userId, yearMonth) {
  const date = yearMonth.split('-');
  date[1] = +date[1] - 1;
  const lastDay = new Date(+date[0], date[1] + 1, 1);

  const transactionAmounts = await Transaction.find({
    userId: userId,
    executionDate: {
      $gt: new Date(1900, 1, 1),
      $lte: lastDay
    }
  }).select('amount');

  let totalBalance = 0;
  transactionAmounts.forEach(tr => {
    totalBalance = totalBalance + tr.amount;
  });
  return { balance: totalBalance };
}

async function createOne(transaction) {
  return await transaction.save()
}

async function deleteTransaction(transaction) {
  return await Transaction.deleteOne({
    id: transaction._id
  })
}
async function deleteAllTransaction(transaction) {

  const initTrId = transaction.initialTransactionId ? transaction.initialTransactionId : transaction._id;

  await deleteTransaction(transaction);
  return await Transaction.deleteMany({
    initialTransactionId: initTrId,
    executionDate: {
      $gte: transaction.executionDate,
      $lt: new Date(2200, 1, 1)
    }
  });
}

export { getAllByUserId, getAllByUserIdAndMonth, getCurrentMonthBalanceByUserId, getGeneralBalanceByUserId, createOne, deleteTransaction, deleteAllTransaction }