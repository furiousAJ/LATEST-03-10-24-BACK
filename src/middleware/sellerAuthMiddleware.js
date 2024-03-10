///src//middleware/sellerAuthMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../Connection/jwt');
const secretKey = config.seller.secretKey; // Use the correct secret key for token verification

const authenticateSellerToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    // No token provided
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, decodedSeller) => {
    if (err) {
      // Token verification failed
      console.error('Token verification failed:', err);
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Token verification successful
    console.log('Decoded Seller ID:', decodedSeller._id);

    // Attach the decoded seller object to the request object
    req.seller = decodedSeller;

    // Log the attached seller ID
    console.log('Request Seller ID:', req.seller._id);

    // Move to the next middleware or route handler
    next();
  });
};

module.exports = {
  authenticateSellerToken
};

