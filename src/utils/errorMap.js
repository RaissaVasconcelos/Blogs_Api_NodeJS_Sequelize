const errorMap = {
  VALUE_INVALID: 400,
  INVALID_FIELD: 400,
  FIELD_IS_REQUIRED: 400,
  POST_NOT_FOUND: 404,
  USER_REGISTERED: 409,
  TOKEN_INVALID: 401,
  USER_NOT_FOUND: 404,
  ERROR: 500,
};

const mapError = (type) => errorMap[type];

module.exports = {
  errorMap,
  mapError,
};