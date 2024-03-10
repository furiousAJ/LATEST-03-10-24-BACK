// userAuthMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../Connection/jwt');
const secretKey = config.user.secretKey;

const authenticateUserToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, decodedUser) => {
    if (err) {
      console.error('Token verification failed:', err);
      return res.status(403).json({ error: 'Forbidden' });
    }

    console.log('Decoded User ID:', decodedUser._id);

    req.user = decodedUser;

    console.log('Request User ID:', req.user._id);

    next();
  });
};

module.exports = {
  authenticateUserToken,
};
