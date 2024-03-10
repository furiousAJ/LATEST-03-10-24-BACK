///src//routes/productnew.js
const app = require('express').Router();
const { request, response } = require('express');
const ProductModel = require("../model/product");
const multer = require('multer');
const { authenticateSellerToken } = require('../middleware/sellerAuthMiddleware');
const SellerModel = require("../model/Seller")


const storage = multer.memoryStorage(); // Store images in memory
const upload = multer({ storage: storage });


app.post('/productnew', authenticateSellerToken, upload.single('Photo'), async (req, res) => {
    try {
        // Extract seller information from the token
        const sellerId = req.seller._id; // Access _id field instead of id
        console.log("Seller ID:", sellerId);
        // Extract other fields from the request body
        const {
            Productname, 
            Productprice,
            Quantity,
            Cid,
            Status, 
            Description
        } = req.body;
        
        // Create a new product instance with the seller ID set
        const newProduct = new ProductModel({
            seller: sellerId,
            Productname, 
            Productprice,
            Quantity,
            Cid,
            Status, 
            Description,
            Photo: {
                data: req.file.buffer,
                contentType: req.file.mimetype,
            }
        });
        
        // Save the new product to the database
        await newProduct.save();
        
        // Respond with a success message
        res.status(200).json({ message: 'Product added successfully' });
    } catch (error) {
        // Handle any errors that occur during product creation
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});






    app.put('/delete/:id',async(request,response)=>{
        let id = request.params.id
        await ProductModel.findByIdAndUpdate(id,{$set:{Status:"Inactive"}})
        response.send("Record Deleted")
    })

    app.put('/active/:id',async(request,response)=>{
        let id = request.params.id
        await ProductModel.findByIdAndUpdate(id,{$set:{Status:"Active"}})
        response.send("Record Active")
    })

    app.get('/productview',async(request,response)=>{
        const result = await ProductModel.aggregate([
            {
              $lookup: {
                from: 'categories', // Name of the other collection
                localField: 'Cid', // field of item
                foreignField: '_id', //field of category
                as: 'prod',
              },
            },
          ]);
        
          response.send(result)
        })

  
      // Get products for a specific seller
app.get('/sellerproductview', async (request, response) => {
    try {
        const sellerId = request.query.sellerId; // Extract sellerId from query params
        if (!sellerId) {
            return response.status(400).json({ message: 'Seller ID is required' });
        }

        const products = await ProductModel.find({ seller: sellerId }).populate('Cid').populate('Photo');
        if (products.length === 0) {
            return response.status(404).json({ message: 'You have no products added' });
        }

        response.status(200).json(products);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

        
    
    // app.put('/editproduct/:id',async(request,response)=>{
    //     let id = request.params.id
    //     await ProductModel.findByIdAndUpdate(id,request.body)
    //     response.send("Record updated")
    // })
    // Import the authenticateSellerToken middleware function

app.put('/editproduct/:id', authenticateSellerToken, upload.single('Photo'), async (request, response) => {
    try {
        const id = request.params.id;
        const { Productname, Productprice, Quantity, Cid, Status, Description } = request.body;
        let result = null;
        if (request.file) {
            const updatedData = {
                Productname, 
                Productprice,
                Quantity,
                Cid,
                Status,
                Description,
                Photo: {
                    data: request.file.buffer,
                    contentType: request.file.mimetype,
                }
            };
            result = await ProductModel.findByIdAndUpdate(id, updatedData);
        } else {
            const updatedData = {
                Productname, 
                Productprice,
                Quantity,
                Cid,
                Status,
                Description
            };
            result = await ProductModel.findByIdAndUpdate(id, updatedData);
        }

        if (!result) {
            return response.status(404).json({ message: 'Item not found' });
        }

        response.status(200).json({ message: 'Item updated successfully', data: result });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});


//     // Handle errors related to token verification failures
// app.use((err, req, res, next) => {
//     if (err.name === 'UnauthorizedError') {
//         res.status(401).json({ error: 'Unauthorized' });
//     } else {
//         next(err);
//     }
// });
    
module.exports = app;