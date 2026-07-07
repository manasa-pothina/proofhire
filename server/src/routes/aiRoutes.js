const express = require('express');
const { generate } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protected: requires a valid JWT (Authorization: Bearer <token>)
router.post('/generate', protect, generate);

module.exports = router;
