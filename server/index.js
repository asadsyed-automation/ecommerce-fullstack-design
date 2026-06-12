const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
const allowedOrigin = process.env.ALLOWED_ORIGIN;
app.use(cors({
  origin: allowedOrigin ? allowedOrigin.split(',') : '*',
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Root Route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});