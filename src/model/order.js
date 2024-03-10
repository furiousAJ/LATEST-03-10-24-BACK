const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  productName: String,
  productPrice: Number,
  productDescription: String,
  productQuantity: Number,
  status: {
    type: String,
    enum: ['Order', 'Delivered', 'Ordered', 'Shipping', 'Cancelled', 'Pending'],
    default: 'Order' // Set your default status
  }
});

const OrderModel = mongoose.model('Order', orderSchema);
module.exports = OrderModel;
