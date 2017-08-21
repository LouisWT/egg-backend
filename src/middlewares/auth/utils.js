import redisClient from 'app/lib/redis';

const verifyToken = async (token) => {
  const isExist = redisClient.existsAsync(token);
  return isExist === 1;
};

export {
  verifyToken,
};
