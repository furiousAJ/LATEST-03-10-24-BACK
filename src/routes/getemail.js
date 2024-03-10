const express = require('express');
const app = express.Router(); // Define app as an instance of Express Router
const EmailModel = require("../model/email");
const router = express.Router();




router.post('/emailnew', (request, response) => {
  console.log(request.body);
  // Save the email to the database
  new EmailModel(request.body).save()
    .then(() => {
      response.send("Record saved");
    })
    .catch((err) => {
      console.error(err);
      response.status(500).send("Error saving record");
    });
});

router.get('/emailview', async (request, response) => {
  try {
    // Fetch and send all email data
    const data = await EmailModel.find();
    response.send(data);
  } catch (error) {
    console.error(error);
    response.status(500).send("Error fetching email data");
  }
});

module.exports = app;
