import redis from 'redis';
import Promise from 'bluebird';
import { redisConfig } from 'config';

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const redisClient = redis.createClient(redisConfig);

redisClient.on('error', (error) => {
  console.error(error);
});

export default redisClient;
