const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { createReminder, listReminders } = require('../controllers/reminderController');

router.post('/', auth, createReminder);
router.get('/user/:userId', auth, listReminders);

module.exports = router;
