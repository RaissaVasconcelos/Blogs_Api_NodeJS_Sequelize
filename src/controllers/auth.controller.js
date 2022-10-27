const authService = require('../service/auth.service');
// const { erroMap } = require('../utils/errorMap');

const login = async (req, res) => {
  // valida a estrutura de email e password
  const result = await authService.validadeBody(req.body);

  // verifica se ele retorna o value, se não, retorna o error gerado por campo vazio
  if (!result.email || !result.password) return res.status(400).json({ message: result });

  const { type, message } = await authService.validateLogin(result);

  if (!type) return res.status(200).json({ token: message });

  return res.status(400).json({ message });
};

const loginUser = async (req, res) => {
  const result = await authService.validadeUser(req.body);

  console.log('result', result);

  // verifica se trouxe o erro ou a estrutura de obj do 
  if (!result.displayName) return res.status(400).json({ message: result });

  const { type, message } = await authService.createUser(result);

  if (!type) return res.status(201).json({ token: message });

  return res.status(400).json({ message });
};

module.exports = {
  login,
  loginUser,
};