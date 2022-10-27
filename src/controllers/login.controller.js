const authService = require('../service/login.service');
const errorMap = require('../utils/errorMap');

const HTTPS_STATUS_OK = 200;

const login = async (req, res) => {
  // valida a estrutura de email e password
  const value = await authService.validadeBody(req.body);

  // verifica se ele retorna o (email e password), se não, retorna o error gerado pelo campo vazio
  if (!value.email || !value.password) {
    return res.status(errorMap.mapError(value.type)).json({ message: value.message });
  }

  const { type, message } = await authService.validateLogin(value);

  if (!type) return res.status(HTTPS_STATUS_OK).json({ token: message });

  return res.status(400).json({ message });
};

module.exports = {
  login,
};