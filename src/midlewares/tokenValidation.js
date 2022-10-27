const errorMap = require('../utils/errorMap');
const validationToken = require('../utils/jwt.utils');

const midlewareToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const result = validationToken.validatedToken(authorization);

  if (result.type) {
    return res.status(errorMap.mapError(result.type)).json({ message: result.message });
  }
  
  next();
};

module.exports = { midlewareToken };
