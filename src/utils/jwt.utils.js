require('dotenv/config');

// importa a biblioteca
const jwt = require('jsonwebtoken');

const createToken = (data) => {
  const token = jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return token;
};

const validatedToken = (token) => {
  try {
    const { data } = jwt.verify(token, process.env.JWT_SECRET);
    return data;
  } catch (error) {
    return { type: 'TOKEN_INVALID', message: 'Expired or invalid token' };
  }
};

module.exports = {
  createToken,
  validatedToken,
};