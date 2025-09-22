const express = require('express');
const router = express.Router();
const { auth, requireRole } = require('../middleware/auth');
const { createVendor, listVendors } = require('../controllers/vendorController');

router.post('/', auth, requireRole(['PHARMACY']), createVendor);
router.get('/', auth, listVendors);

module.exports = router;
