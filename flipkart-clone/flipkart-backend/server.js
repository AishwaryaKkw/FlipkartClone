require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/flipkart-clone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
});

const Product = mongoose.model('Product', productSchema);

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', userSchema);

// Routes
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post('/api/products', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json(newProduct);
});

// User Registration
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();
  res.status(201).json({ message: 'User registered successfully' });
});

// User Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, 'secret-key', { expiresIn: '1h' });
  res.json({ token });
});

// Cart Schema
const cartSchema = new mongoose.Schema({
    userId: String,
    products: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        quantity: Number,
      },
    ],
  });
  
  const Cart = mongoose.model('Cart', cartSchema);
  
  // Add to Cart API
  app.post('/api/cart', async (req, res) => {
    const { userId, productId } = req.body;
  
    let cart = await Cart.findOne({ userId });
  
    if (!cart) {
      cart = new Cart({ userId, products: [{ productId, quantity: 1 }] });
    } else {
      const productIndex = cart.products.findIndex((p) => p.productId.equals(productId));
      if (productIndex > -1) {
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({ productId, quantity: 1 });
      }
    }
  
    await cart.save();
    res.json(cart);
  });
  
  // Get Cart Items

  
  // Remove Item from Cart
  app.delete('/api/cart/:userId/:productId', async (req, res) => {
    const { userId, productId } = req.params;
    const cart = await Cart.findOne({ userId });
  
    if (cart) {
      cart.products = cart.products.filter((p) => !p.productId.equals(productId));
      await cart.save();
    }
  
    res.json(cart);
  });
  

  

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
