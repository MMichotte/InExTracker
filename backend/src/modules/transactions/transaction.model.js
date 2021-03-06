import mongoose from 'mongoose';
import transactionTypes from './enums/transactionTypes.enum'
import transactionRepeat from './enums/transactionRepeat.enum'

const TransactionSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    require: true,
  },
  amount: {
    type: Number,
    require: true
  },
  executionDate: {
    type: Date,
    default: Date.now
  },
  repeat: {
    type: String,
    enum: transactionRepeat,
    require: false
  },
  description: {
    type: String,
    trim: true,
    require: false,
  },
  tags: {
    type: [String],
    enum: transactionTypes,
    require: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    require: true
  }
});

const Transaction = mongoose.model('transactions', TransactionSchema);
export default Transaction