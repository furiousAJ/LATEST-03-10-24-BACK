///src//routes/sellerAuth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Seller = require('../model/Seller');
const Config = require('../Connection/jwt');
const { authenticateSellerToken } = require("../middleware/sellerAuthMiddleware");
const { generateSellerToken } = require('../sellerUtils'); // Import the generateSellerToken function

router.post('/sellersignup', async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;

    const existingSeller = await Seller.findOne({ email });

    if (existingSeller) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSeller = new Seller({ name, email, phone, address, password: hashedPassword });
    await newSeller.save();

    res.status(201).json({ message: 'Seller registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/sellerlogin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const seller = await Seller.findOne({ email });

    if (!seller || !(await bcrypt.compare(password, seller.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token for the authenticated seller
    const token = generateSellerToken(seller);

    res.json({ token, _id: seller._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/verifyToken', async (req, res) => {
  const { token } = req.body;

  try {
    jwt.verify(token, Config.seller.secretKey, (err, decoded) => {
      if (err) {
        console.error('Token verification failed:', err);
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ success: false, message: 'Token has expired' });
        } else {
          return res.status(401).json({ success: false, message: 'Invalid token' });
        }
      } else {
        res.status(200).json({ success: true, message: 'Token is valid' });
      }
    });
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.get('/protected-route', authenticateSellerToken, (req, res) => {
  console.log('Seller ID attached to request:', req.seller._id);
  res.send('Protected route accessed successfully');
});


router.get('/sellerprofile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const Profile = await Seller.findById(id); // Assuming id is the parameter for findById
    if (!Profile) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(Profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/sellerlog', async (req, res) => {
  try {
    const data = await Seller.find();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
