import { ETransactionTypes } from './../enums/transactionTypes.enum';
import { ETransactionRepeat } from "../enums/transactionRepeat.enum";

export class Transaction {
  _id: number;
  title: string;
  amount: number;
  executionDate: Date;
  repeat: ETransactionRepeat;
  description: string;
  tags: ETransactionTypes[];
  userId: string;

  constructor(obj?: Transaction) {
    Object.assign(this, obj);
  }
}