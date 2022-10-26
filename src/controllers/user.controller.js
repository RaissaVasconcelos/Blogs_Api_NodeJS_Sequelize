// service
const userService = require('../service/UserService'); 

const login = async (req, res) => {
  const data = req.body;
  const result = await userService.login(data);
  if (result) return res.status(201).json(result);
  return res.status(401).json('erro');
};

module.exports = {
  login,
};
