const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  productPrice: {
    type: Number,
    required: true
  },
  productQuantity: {
    type: Number,
    required: true
  },
  productDescription: {
    type: String,
    required: true
  },
  seller: {  // Update field name to match MongoDB schema
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller", // Reference to the Seller model
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true
  }
});

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;
