// service
const userService = require('../service/user.service'); 
const errorMap = require('../utils/errorMap');

const HTTPS_STATUS_OK = 200;
const HTTPS_STATUS_CREATED = 201;

const loginUser = async (req, res) => {
  const result = await userService.validadeUser(req.body);

  // verifica se trouxe o erro ou a estrutura de obj do 
  if (!result.displayName) return res.status(400).json({ message: result });

  const { type, message } = await userService.createUser(result);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(HTTPS_STATUS_CREATED).json({ token: message });
};

const getAll = async (_req, res) => {
  const result = await userService.getAll();

  return res.status(HTTPS_STATUS_OK).json(result);
};

module.exports = {
  loginUser,
  getAll,
};
