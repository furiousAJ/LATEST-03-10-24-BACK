// src/utils/userUtils.js
const jwt = require('jsonwebtoken');
const config = require('./Connection/jwt');

const generateUserToken = (user) => {
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: 'user', // You can include the role if needed
  };
  return jwt.sign(payload, config.user.secretKey, { expiresIn: config.user.expiresIn });
};

module.exports = {
  generateUserToken,
};
