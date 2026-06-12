const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// ─────────────────────────────────────────────
// PUBLIC ROUTES (storefront reads)
// ─────────────────────────────────────────────

// GET all products  (with optional search + category filter)
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    let filter = {};

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }
    if (category && category !== 'All') {
      filter.category = category;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─────────────────────────────────────────────
// ADMIN PROTECTED ROUTES
// ─────────────────────────────────────────────

// GET stats for admin dashboard
router.get('/admin/stats', verifyToken, isAdmin, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const categories = await Product.distinct('category');
    const totalCategories = categories.length;
    const totalStockAgg = await Product.aggregate([
      { $group: { _id: null, total: { $sum: '$stock' } } }
    ]);
    const totalStock = totalStockAgg[0]?.total || 0;
    const lowStockProducts = await Product.find({ stock: { $lte: 10 } })
      .select('name stock category')
      .sort({ stock: 1 });

    res.json({
      totalProducts,
      totalCategories,
      totalStock,
      lowStockCount: lowStockProducts.length,
      lowStockProducts,
      categories,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE product (admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE product (admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE product (admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;