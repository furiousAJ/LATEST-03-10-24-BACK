const express = require('express');
const router = express.Router();
const SellerorderModel = require('../model/sellerorder');



router.post('/orderseller', async (req, res) => {
    try {
      const { productId, productName, productPrice, productDescription, productQuantity, status } = req.body; // Corrected variable name
      const newItem = new SellerorderModel({ productId, productName, productPrice, productDescription, productQuantity, status }); // Corrected variable name
      console.log('saved',newItem);
      await newItem.save();
      res.status(201).json({ message: 'Order added successfully' }); // Updated response message
    } catch (error) {
      console.error('Error adding order:', error); // Updated error message
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.get('/sellervieworder', async (req, res) => {
    try {
      
      const orders = await SellerorderModel.find();
      res.json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = router;