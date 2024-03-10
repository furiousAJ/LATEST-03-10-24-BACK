// src/middleware/adminAuthMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../Connection/jwt');
const secretKey = config.admin.secretKey;

const authenticateAdminToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, admin) => {
    if (err) return res.sendStatus(403);

    req.admin = admin;
    next();
  });
};

module.exports = {
  authenticateAdminToken,
};
