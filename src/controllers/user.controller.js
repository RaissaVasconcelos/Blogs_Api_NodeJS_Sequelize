// service
const userService = require('../service/user.service'); 
const errorMap = require('../utils/errorMap');

const loginUser = async (req, res) => {
  const result = await userService.validadeUser(req.body);

  // verifica se trouxe o erro ou a estrutura de obj do 
  if (!result.displayName) return res.status(400).json({ message: result });

  const { type, message } = await userService.createUser(result);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json({ token: message });
};

module.exports = {
  loginUser,
};
