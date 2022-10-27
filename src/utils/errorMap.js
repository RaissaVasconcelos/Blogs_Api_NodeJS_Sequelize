const errorMap = {
  VALUE_INVALID: 400,
  INVALID_FIELD: 400,
  USER_REGISTERED: 409,
  TOKEN_INVALID: 401,
  ERROR: 500,
};

const mapError = (type) => errorMap[type];

module.exports = {
  errorMap,
  mapError,
};