const authService = require('../service/auth.service');

const login = async (req, res) => {
  // valida a estrutura de email e password
  const result = await authService.validadeBody(req.body);
  // verifica se ele retorna o value, se não, retorna o error gerado por campo vazio
  if (!result.email || !result.password) return res.status(400).json({ message: result });

  const { type, message } = await authService.validateLogin(result);

  if (!type) return res.status(200).json({ token: message });

  return res.status(400).json({ message });
};

module.exports = {
  login,
};