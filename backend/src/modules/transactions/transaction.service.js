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
      $gte: firstDay,
      $lt: lastDay
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

async function getGeneralBalanceByUserId(userId, yearMonth) {
  const date = yearMonth.split('-');
  date[1] = +date[1] - 1;
  const lastDay = new Date(+date[0], date[1] + 1, 1);

  const transactionAmounts = await Transaction.find({
    userId: userId, executionDate: {
      $gte: new Date(1900,1,1),
      $lt: lastDay
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

export { getAllByUserId, getAllByUserIdAndMonth, getCurrentMonthBalanceByUserId, getGeneralBalanceByUserId, createOne }