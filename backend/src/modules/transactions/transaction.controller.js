import Transaction from './transaction.model'
import * as transactionService from './transaction.service'
import * as userService from '../users/user.service'
import * as JWTService from '../../core/services/jwt.service'

async function getAllFromUserTransaction(req, res) {
  // #swagger.tags = ['Transactions']
  const userId = JWTService.decodeJWT(req.headers['authorization']).user_id;
  res.send(await transactionService.getAllByUserId(userId));
}

async function getAllFromUserByMonthTransaction(req, res) {
  // #swagger.tags = ['Transactions']
  const userId = JWTService.decodeJWT(req.headers['authorization']).user_id;
  res.send(await transactionService.getAllByUserIdAndMonth(userId, req.params.yearMonth));
}

async function getCurrentMonthBalance(req, res) {
  // #swagger.tags = ['Transactions']
  const userId = JWTService.decodeJWT(req.headers['authorization']).user_id;
  res.send(await transactionService.getCurrentMonthBalanceByUserId(userId, req.params.yearMonth));
}

async function getGeneralBalance(req, res) {
  // #swagger.tags = ['Transactions']
  const userId = JWTService.decodeJWT(req.headers['authorization']).user_id;
  res.send(await transactionService.getGeneralBalanceByUserId(userId, req.params.yearMonth));
}

async function createTransaction(req, res) {
  // #swagger.tags = ['Transactions']

  const { title, amount, executionDate, repeat, description, tags } = req.body;

  //TODO ad more validation!
  if (!(title && amount)) {
    res.status(400).send();
    return;
  }

  const userId = await JWTService.decodeJWT(req.headers.authorization).user_id;

  const newTransaction = new Transaction({
    title: title,
    amount: amount,
    executionDate: executionDate,
    repeat: repeat,
    description: description,
    tags: tags,
    userId: userId
  });

  await userService.findOneById(newTransaction.userId)
    .then(async existingUser => {
      if (existingUser) {
        let transactions = [];
        switch (newTransaction.repeat) {
          case "D":
            for (let i = 0; i < 365; i++) {
              const newDate = new Date(newTransaction.executionDate.getFullYear(), newTransaction.executionDate.getMonth() + 1, newTransaction.executionDate.getDay()+ i);
              const newTr = new Transaction({
                title: newTransaction.title,
                amount: newTransaction.amount,
                executionDate: newDate,
                repeat: newTransaction.repeat,
                description: newTransaction.description,
                tags: newTransaction.tags,
                userId: userId
              });
              transactions.push(newTr);
            }
            break;
          case "W":
            for (let i = 0; i < 53; i++) {
              const newDate = new Date(newTransaction.executionDate.getFullYear(), newTransaction.executionDate.getMonth() + 1, newTransaction.executionDate.getDay()+(i*7));
              const newTr = new Transaction({
                title: newTransaction.title,
                amount: newTransaction.amount,
                executionDate: newDate,
                repeat: newTransaction.repeat,
                description: newTransaction.description,
                tags: newTransaction.tags,
                userId: userId
              });
              transactions.push(newTr);
            }
            break;
          case "M":
            for (let i = 0; i < 12; i++) {
              const newDate = new Date(newTransaction.executionDate.getFullYear(), newTransaction.executionDate.getMonth() +1 +i, newTransaction.executionDate.getDay());
              const newTr = new Transaction({
                title: newTransaction.title,
                amount: newTransaction.amount,
                executionDate: newDate,
                repeat: newTransaction.repeat,
                description: newTransaction.description,
                tags: newTransaction.tags,
                userId: userId
              });
              transactions.push(newTr);
            }
            break;
          case "Y":
            for (let i = 0; i < 5; i++) {
              const newDate = new Date(newTransaction.executionDate.getFullYear() + i, newTransaction.executionDate.getMonth() + 1, newTransaction.executionDate.getDay());
              const newTr = new Transaction({
                title: newTransaction.title,
                amount: newTransaction.amount,
                executionDate: newDate,
                repeat: newTransaction.repeat,
                description: newTransaction.description,
                tags: newTransaction.tags,
                userId: userId
              });
              transactions.push(newTr);
            }
            break;
        
          default:
            transactions.push(newTransaction);
            break;
        }
        let promises = [];
        transactions.forEach(tr => {
          promises.push(transactionService.createOne(tr));
        });
        Promise.all(promises).then(() => {
          res.status(200).send(promises[0]);
        })
        .catch(err => {
          console.log("Error is ", err.message);
          res.status(400).send(err.message);
        });
      }
      else {
        res.status(409).send('User does not exist!');
      }
    })
    .catch(err => {
      console.log("Error : ", err.message);
      res.status(400).send(err.message);
    });

}

export { getAllFromUserTransaction, getAllFromUserByMonthTransaction, getCurrentMonthBalance, getGeneralBalance, createTransaction }