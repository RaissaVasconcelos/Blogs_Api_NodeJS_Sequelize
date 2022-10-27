const erroMap = {
  VALUE_INVALID: 400,
  INVALID_FIELD: 400,
  USER_INVALID: 409,
  ERROR: 500,
};

const mapError = (type) => erroMap[type];

module.exports = {
  erroMap,
  mapError,
};