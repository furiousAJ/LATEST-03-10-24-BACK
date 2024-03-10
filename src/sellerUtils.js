//sellerUtils.js
const jwt = require('jsonwebtoken');
const config = require('./Connection/jwt');

const generateSellerToken = (seller) => {
  const payload = {
    _id: seller._id,
    name: seller.name,
    email: seller.email,
  };
  return jwt.sign(payload, config.seller.secretKey, { expiresIn: config.seller.expiresIn });
};

module.exports = {
  generateSellerToken
};

