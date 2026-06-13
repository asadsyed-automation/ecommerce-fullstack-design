const express = require('express');
const router = express.Router();
const multer = require('multer');
const ImageKit = require('imagekit');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// ── ImageKit SDK init ───────────────────────────────────────────────────────
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/2gdbnnqst',
});

// ── Multer: store file in memory (no disk I/O) ─────────────────────────────
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, WebP, and GIF images are allowed.'));
    }
  },
});

// ── POST /api/upload  (admin only) ─────────────────────────────────────────
router.post('/', verifyToken, isAdmin, upload.single('image'), async (req, res) => {
  try {
    // Guard: check required env vars are configured
    if (!process.env.IMAGEKIT_PRIVATE_KEY || !process.env.IMAGEKIT_PUBLIC_KEY) {
      return res.status(503).json({
        message:
          'ImageKit keys not configured. Please set IMAGEKIT_PUBLIC_KEY and IMAGEKIT_PRIVATE_KEY in your .env file.',
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided.' });
    }

    // Build a clean filename
    const fileName = `product_${Date.now()}_${req.file.originalname.replace(/\s+/g, '_')}`;

    const result = await imagekit.upload({
      file: req.file.buffer,          // Buffer from multer memory storage
      fileName,
      folder: '/ecommerce/products',
      useUniqueFileName: true,
    });

    res.json({
      url: result.url,
      fileId: result.fileId,
      name: result.name,
    });
  } catch (error) {
    console.error('ImageKit upload error:', error);
    res.status(500).json({ message: error.message || 'Image upload failed.' });
  }
});

// ── Multer error handler ───────────────────────────────────────────────────
router.use((err, _req, res, _next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ message: 'File too large. Maximum size is 10 MB.' });
  }
  res.status(400).json({ message: err.message });
});

module.exports = router;
