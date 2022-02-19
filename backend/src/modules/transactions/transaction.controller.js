/* eslint-disable no-constant-condition */
import Transaction from './transaction.model'
import moment from 'moment'
import * as transactionService from './transaction.service'
import * as userService from '../users/user.service'
import * as JWTService from '../../core/services/jwt.service'

async function getAllFromUserTransaction(req, res) {
  // #swagger.tags = ['Transactions']
  const userId = JWTService.decodeJWT(req.headers['authorization']).user_id;
  res.send(await transactionService.getAllByUserId(userId));
}

async function getAllFromUserByYearTransaction(req, res) {
  // #swagger.tags = ['Transactions']
  const userId = JWTService.decodeJWT(req.headers['authorization']).user_id;
  res.send(await transactionService.getAllByUserIdAndYear(userId, req.params.year));
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
  const { title, amount, executionDate, repeat, endDate, description, tags } = req.body;

  //TODO ad more validation!
  if (!(title && amount)) {
    res.status(400).send();
    return;
  }

  const userId = await JWTService.decodeJWT(req.headers.authorization).user_id;

  const endRepeatDate = moment(endDate);

  const newTransaction = new Transaction({
    title: title,
    amount: amount,
    executionDate: moment(executionDate),
    repeat: repeat,
    description: description,
    tags: tags,
    userId: userId
  });

  await userService.findOneById(newTransaction.userId)
    .then(async existingUser => {
      if (existingUser) {

        const initialTransactionId = (await transactionService.createOne(newTransaction)).id;
        
        let transactions = [];
        let i = 1;
        
        switch (newTransaction.repeat) {
          case "D":
            while(true) {
              const newDate = moment(executionDate).add(i,'days');
              if (newDate > endRepeatDate) {
                break;
              }
              const newTr = new Transaction({
                title: newTransaction.title,
                amount: newTransaction.amount,
                executionDate: newDate,
                repeat: newTransaction.repeat,
                initialTransactionId: initialTransactionId,
                description: newTransaction.description,
                tags: newTransaction.tags,
                userId: userId
              });
              transactions.push(newTr);
              i += 1;
            }
            break;
          case "W":
            while(true) {
              const newDate = moment(executionDate).add(i, 'weeks');
              if (newDate > endRepeatDate) {
                break;
              }
              const newTr = new Transaction({
                title: newTransaction.title,
                amount: newTransaction.amount,
                executionDate: newDate,
                repeat: newTransaction.repeat,
                initialTransactionId: initialTransactionId,
                description: newTransaction.description,
                tags: newTransaction.tags,
                userId: userId
              });
              transactions.push(newTr);
              i += 1;
            }
            break;
          case "M":
            while(true) {
              const newDate = moment(executionDate).add(i,'months');
              if (newDate > endRepeatDate) {
                break;
              }
              const newTr = new Transaction({
                title: newTransaction.title,
                amount: newTransaction.amount,
                executionDate: newDate,
                repeat: newTransaction.repeat,
                initialTransactionId: initialTransactionId,
                description: newTransaction.description,
                tags: newTransaction.tags,
                userId: userId
              });
              transactions.push(newTr);
              i += 1;
            }
            break;
          case "Y":
            while(true) {
              const newDate = moment(executionDate).add(i, 'years');
              if (newDate > endRepeatDate) {
                break;
              }
              const newTr = new Transaction({
                title: newTransaction.title,
                amount: newTransaction.amount,
                executionDate: newDate,
                repeat: newTransaction.repeat,
                initialTransactionId: initialTransactionId,
                description: newTransaction.description,
                tags: newTransaction.tags,
                userId: userId
              });
              transactions.push(newTr);
              i += 1;
            }
            break;
        
          default:
            break;
        }
        let promises = [];
        transactions.forEach(tr => {
          promises.push(transactionService.createOne(tr));
        });
        Promise.all(promises).then(() => {
          res.status(200).send([]); //TODO
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

async function deleteTransaction(req, res) {
  // #swagger.tags = ['Transactions']

  const transaction = req.body.transaction;
  const deleteAll = req.body.deleteAll;

  if(deleteAll) {
    res.send(await transactionService.deleteAllTransaction(transaction));
  } else {
    res.send(await transactionService.deleteTransaction(transaction));
  }

}

export { getAllFromUserTransaction, getAllFromUserByYearTransaction, getAllFromUserByMonthTransaction, getCurrentMonthBalance, getGeneralBalance, createTransaction, deleteTransaction }