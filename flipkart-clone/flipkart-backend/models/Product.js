const mongoose = require('mongoose');

// Define the schema for products
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },  // URL to the product image
}, {
  timestamps: true,  // To automatically add createdAt and updatedAt fields
});

// Create a model from the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
