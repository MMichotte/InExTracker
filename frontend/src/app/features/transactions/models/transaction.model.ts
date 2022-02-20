import { ETransactionRepeat } from "../enums/transactionRepeat.enum";

export class Transaction {
  _id: string;
  title: string;
  amount: number;
  executionDate: Date;
  endDate: Date;
  repeat: ETransactionRepeat;
  description: string;
  tags: any;
  userId: string;

  constructor(obj?: Transaction) {
    Object.assign(this, obj);
  }
}