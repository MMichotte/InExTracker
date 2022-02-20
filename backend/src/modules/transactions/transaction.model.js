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
  endDate: {
    type: Date,
    require: false
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
    label: {
      type: String,
      require: false
    },
    color: {
      type: String,
      require: false
    },
    icon: {
      type: String,
      require: false
    } ,
    require: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    require: true
  }
});

const Transaction = mongoose.model('transactions', TransactionSchema);
export default Transaction