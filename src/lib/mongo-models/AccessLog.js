import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const mixed = Schema.Types.Mixed;

const AccessLogSchema = new Schema({
  user: {
    type: mixed,
    required: true,
  },
  url: {
    type: String,
  },
  userAgent: {
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
  createTime: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

mongoose.model(
  'AccessLog',
  AccessLogSchema,
  'AccessLogs',
);
