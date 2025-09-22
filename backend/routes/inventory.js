const express = require('express');
const router = express.Router();
const { auth, requireRole } = require('../middleware/auth');
const { addStock, listStocks } = require('../controllers/inventoryController');

// add stock (pharmacy only)
router.post('/:pharmacyId/stocks', auth, requireRole(['PHARMACY']), addStock);
router.get('/:pharmacyId/stocks', auth, listStocks);

module.exports = router;
