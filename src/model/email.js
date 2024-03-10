

const mongoose = require("mongoose");

const { Schema } = mongoose;

const emailSchema = new Schema({
  Email: String, 

});

const EmailModel = mongoose.model("Email", emailSchema);  // Fix the model registration
module.exports = EmailModel;
