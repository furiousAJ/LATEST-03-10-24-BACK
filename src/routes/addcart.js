const express = require('express');
const router = express.Router();
const CartModel = require("../model/cart");
const jwt = require('jsonwebtoken');
const { authenticateUserToken } = require('../middleware/userAuthMiddleware');

// Add a new item to the cart
router.post('/cartnew', authenticateUserToken, async (request, response) => {
  try {
     // Extract userId from the token
     const userId = request.user._id;
     console.log("User ID:", userId);
      // Extract other fields from the request body
    const { productId,
            productName,
            productPrice,
            productDescription, 
            productQuantity,
            sellerId
            } = request.body;

   
    // Check if the product already exists in the cart for this user
    const existingItem = await CartModel.findOne({ productId, userId });

    if (existingItem) {
      return response.status(200).json({ message: 'Product is already in your cart' });
    }

    // If the product doesn't exist, add it to the cart
    const newItem = new CartModel({ 
      user: userId,
      productId, 
      productName, 
      productPrice, 
      productDescription, 
      productQuantity, 
      seller: sellerId });

    await newItem.save();

    response.status(201).json({ message: 'Item added to cart' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
});


// Get all cart items
router.get('/viewcart', async (request, response) => {
  try {
    const cartItems = await CartModel.find();
    response.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

// Remove an item from the cart
router.delete('/remove/:id', async (request, response) => {
  const { id } = request.params;
  try {
    const deletedItem = await CartModel.findByIdAndDelete(id);
    if (!deletedItem) {
      return response.status(404).json({ error: 'Item not found' });
    }
    return response.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;