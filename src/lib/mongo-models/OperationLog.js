import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const mixed = Schema.Types.Mixed;

const OperationLogSchema = new Schema({
  user: {
    type: mixed,
    required: true,
  },
  userAgent: {
    type: String,
  },
  url: {
    type: String,
  },
  ip: {
    type: String,
  },
  api: {
    type: String,
  },
  inputParam: {
    type: mixed,
  },
  result: {
    type: mixed,
  },
  operationType: {
    type: String,
    enum: ['add', 'edit', 'delete', 'login'],
  },
  createTime: {
    type: Date,
    default: Date.now,
    index: true,
  },
});
mongoose.model(
  'OperationLog',
  OperationLogSchema,
  'OperationLogs',
);
