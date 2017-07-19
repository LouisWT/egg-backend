import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    accountId: {
      type: Number,
      index: true,
    },
    createTime: {
      type: Number,
    },
  },
  {
  });

mongoose.model('User', UserSchema, 'Users');
