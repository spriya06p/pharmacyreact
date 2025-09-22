const { Reminder } = require('../models');

exports.createReminder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { medicineId, reminderTime, recurrence, channel } = req.body;
    const r = await Reminder.create({ userId, medicineId, reminderTime, recurrence, channel });
    res.json(r);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.listReminders = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (req.user.id !== userId && req.user.role !== 'PHARMACY') return res.status(403).json({ error: 'Forbidden' });
    const rems = await Reminder.findAll({ where: { userId }});
    res.json(rems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
