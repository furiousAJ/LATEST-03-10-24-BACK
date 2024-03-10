const express = require('express');
const router = express.Router();
const OrderModel = require('../model/order');

// Create a new order
router.post('/neworder', async (req, res) => {
  try {
    const { productId, productName, productPrice, productDescription, productQuantity, status } = req.body; // Corrected variable name
    const newItem = new OrderModel({ productId, productName, productPrice, productDescription, productQuantity, status }); // Corrected variable name
    await newItem.save();
    res.status(201).json({ message: 'Order added successfully' }); // Updated response message
  } catch (error) {
    console.error('Error adding order:', error); // Updated error message
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all orders
router.get('/vieworder', async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;