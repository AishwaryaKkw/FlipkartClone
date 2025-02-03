const express = require('express');
const Product = require('./models/Product');  // Import the Product model
const router = express.Router();

// POST route to add a new product
router.post('/api/products', async (req, res) => {
  const { name, description, price, image } = req.body;  // Get product details from the request body

  // Validate the input
  if (!name || !description || !price || !image) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Create a new Product instance
  const newProduct = new Product({ name, description, price, image });

  try {
    // Save the product to the database
    await newProduct.save();
    res.status(201).json(newProduct);  // Respond with the added product
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Error adding product' });
  }
});

module.exports = router;
