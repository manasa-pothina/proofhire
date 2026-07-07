const express = require('express');
const { verifySignature } = require('../controllers/web3Controller');

const router = express.Router();

router.post('/verify', verifySignature);

module.exports = router;
