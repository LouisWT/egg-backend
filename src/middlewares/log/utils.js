import mongoose from 'mongoose';

const AccessLogs = mongoose.model('AccessLog');
const OperationLog = mongoose.model('OperationLog');

const addAccessLog = async (param) => {
  try {
    const log = param;
    await AccessLogs.save(log);
  } catch (error) {
    console.error(error);
  }
};

const addOperationLog = async (param) => {
  try {
    const log = param;
    await OperationLog.save(log);
  } catch (error) {
    console.error(error);
  }
};

export {
  addAccessLog,
  addOperationLog,
};
