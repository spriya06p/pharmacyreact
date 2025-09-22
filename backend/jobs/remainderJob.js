const cron = require('node-cron');
const { Reminder, User } = require('../models');
const { Op } = require('sequelize');
const notifier = require('../utils/notifier');

module.exports = function startReminderJob() {
  // every minute in dev; change cron expression for production
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date();
      const due = await Reminder.findAll({ where: { reminderTime: { [Op.lte]: now }, active: true }});
      for (const r of due) {
        const user = await User.findByPk(r.userId);
        // notifier: send notification (stub)
        await notifier.sendNotification(user, `Reminder: time to take medicine id ${r.medicineId}`);
        // handle recurrence
        if (r.recurrence === 'NONE') {
          r.active = false;
        } else if (r.recurrence === 'DAILY') {
          const next = new Date(r.reminderTime);
          next.setDate(next.getDate() + 1);
          r.reminderTime = next;
        } else if (r.recurrence === 'WEEKLY') {
          const next = new Date(r.reminderTime);
          next.setDate(next.getDate() + 7);
          r.reminderTime = next;
        }
        await r.save();
      }
    } catch (err) {
      console.error('Reminder job error', err);
    }
  });
};
