import mongoose from 'mongoose';
import transactionRepeat from './enums/transactionRepeat.enum'
import moment from 'moment';

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
    default: moment()
  },
  repeat: {
    type: String,
    enum: transactionRepeat,
    require: false
  },
  initialTransactionId: {
    type: String,
    require: false
  },
  description: {
    type: String,
    trim: true,
    require: false,
  },
  tags: {
    type: String,
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