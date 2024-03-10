///src//connection/Database.js
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://anjithkj:anjith@cluster0.8uatvth.mongodb.net/ecog?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.error("DB connection error:", err));