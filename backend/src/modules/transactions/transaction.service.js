import Transaction from './transaction.model'
import moment from 'moment'

async function getAllByUserId(userId) {
  return await Transaction.find({ userId: userId });
}

async function getAllByUserIdAndYear(userId, year) {
  return await Transaction.find({
    userId: userId,
    executionDate: {
      $gte: moment(year).startOf('year'),
      $lte: moment(year).endOf('year')
    }
  });
}

async function getAllByUserIdAndMonth(userId, yearMonth) {
  return await Transaction.find({
    userId: userId,
    executionDate: {
      $gte: moment(yearMonth).startOf('month'),
      $lte: moment(yearMonth).endOf('month')
    }
  });
}

async function getCurrentMonthBalanceByUserId(userId, yearMonth) {
  const transactionAmounts = await Transaction.find({
    userId: userId,
    executionDate: {
      $gte: moment(yearMonth).startOf('month'),
      $lte: moment(yearMonth).endOf('month')
    }
  }).select('amount');

  let totalBalance = 0;
  transactionAmounts.forEach(tr => {
    totalBalance = totalBalance + tr.amount;
  });
  return { balance: totalBalance };
}

async function getGeneralBalanceByUserId(userId, yearMonth) {
  const transactionAmounts = await Transaction.find({
    userId: userId,
    executionDate: {
      $gte: new Date(1900, 1, 1),
      $lte: moment(yearMonth).endOf('month')
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
    _id: transaction._id
  })
}
async function deleteAllTransaction(transaction) {
  const initTrId = transaction.initialTransactionId ? transaction.initialTransactionId : transaction._id;

  await deleteTransaction(transaction);

  await Transaction.deleteMany({
    initialTransactionId: initTrId,
    executionDate: {
      $gte: transaction.executionDate,
      $lt: new Date(2200, 1, 1)
    }
  });

  return [];
}

export { getAllByUserId, getAllByUserIdAndYear, getAllByUserIdAndMonth, getCurrentMonthBalanceByUserId, getGeneralBalanceByUserId, createOne, deleteTransaction, deleteAllTransaction }