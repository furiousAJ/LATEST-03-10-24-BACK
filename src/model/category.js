const mongoose = require("mongoose");

const { Schema } = mongoose;

const categorySchema = new Schema({
  Categoryname: String, 
  Status: {
    type: String,
    default: 'Active', // Set your default status
  },
});

const CategoryModel = mongoose.model("Category", categorySchema);  // Fix the model registration
module.exports = CategoryModel;
