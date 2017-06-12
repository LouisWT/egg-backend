import mysql from 'mysql2/promise';
import { mysqlConfig } from 'config';

const pool = mysql.createPool(mysqlConfig);

const query = async (sql, params) => {
  let connection = null;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(sql, params);
    return rows;
  } catch (error) {
    console.error(sql);
    console.error(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
  return 'error';
};

const queryOne = async (sql, params) => {
  let connection = null;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(sql, params);
    return rows[0];
  } catch (error) {
    console.error(sql);
    console.error(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
  return 'error';
};

const commit = async (connection) => {
  console.log('commit');
  try {
    await connection.query('COMMIT');
    await connection.query('SET AUTOCOMMIT=1');
    console.log('commit success');
  } catch (error) {
    await connection.query('SET AUTOCOMMIT=1');
    console.error('rollback ', error);
    await connection.query('ROLLBACK');
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const transaction = async (func) => {
  const connection = await pool.getConnection();
  await connection.query('START TRANSACTION');
  await connection.query('SET AUTOCOMMIT=0');
  let needRollback = false;
  const rollback = async () => {
    needRollback = true;
    await connection.query('ROLLBACK');
    return connection.query('SET AUTOCOMMIT=1');
  };

  const tstQuery = async (sql, params) => {
    try {
      const [data] = await connection.query(sql, params);
      return data;
    } catch (error) {
      console.error(error);
      console.error(sql);
      await rollback();
    }
    return 'error';
  };

  const result = await func(tstQuery, rollback);
  console.log('needRollback: ', needRollback);
  if (!needRollback) {
    await commit(connection);
  } else {
    connection.release();
  }
  return result;
};

export {
  query,
  queryOne,
  transaction,
};
