//initAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./src/model/admin'); // Adjust the path based on your file structure

mongoose.connect('mongodb+srv://anjithkj:anjith@cluster0.8uatvth.mongodb.net/ecog?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function () {
  console.log('Connected to the database');

  const adminData = {
    username: 'akjajapd',
    password: 'messironaldoneymar', // Make sure to hash the password before storing it in production
  };

  try {
    // Insert the admin user
    const existingAdmin = await Admin.findOne({ username: adminData.username });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminData.password, 10);
      const newAdmin = new Admin({
        username: adminData.username,
        password: hashedPassword,
      });
      await newAdmin.save();
      console.log('Admin user inserted:', newAdmin);
    } else {
      console.log('Admin user already exists:', existingAdmin);
    }
  } catch (error) {
    console.error('Error inserting admin user:', error);
  } finally {
    // Close the database connection
    db.close();
  }
});
