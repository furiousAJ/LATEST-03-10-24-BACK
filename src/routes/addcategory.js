///src//routes/addcategory.js

const express = require('express');
const router = express.Router();
const CategoryModel = require("../model/category");
const SellerModel = require("../model/Seller"); // Import Seller model

router.post('/categorynew', async (request, response) => {
  try {
    const { Categoryname } = request.body;

    if (!Categoryname) {
      return response.status(400).json({ error: 'Categoryname is required' });
    }

    // Create the category
    const newCategory = await CategoryModel.create({ Categoryname });

    // Update all sellers to include the new category
    const sellers = await SellerModel.find();
    const updatePromises = sellers.map(async (seller) => {
      seller.categories.push(newCategory._id);
      await seller.save();
    });
    await Promise.all(updatePromises);

    response.status(201).json({ message: 'Category added successfully' });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/categoryview', async (request, response) => {
  try {
    const data = await CategoryModel.find();
    response.send(data);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/inactive/:id', async (request, response) => {
  try {
    const id = request.params.id;
    await CategoryModel.findByIdAndUpdate(id, { $set: { Status: "Inactive" } });
    response.send("Record Deleted");
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/active/:id', async (request, response) => {
  try {
    const id = request.params.id;
    await CategoryModel.findByIdAndUpdate(id, { $set: { Status: "Active" } });
    response.send("Record Active");
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }

});

router.put('/cedit/:id',async(request,response)=>{
  let id = request.params.id
  await CategoryModel.findByIdAndUpdate(id,request.body)
  response.send("Record updated")
})


module.exports = router;



