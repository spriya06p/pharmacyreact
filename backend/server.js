require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const inventoryRoutes = require('./routes/inventory');
const reminderRoutes = require('./routes/reminders');
const vendorRoutes = require('./routes/vendors');
const orderRoutes = require('./routes/orders');
const startReminderJob = require('./jobs/reminderJob');
const startExpiryJob = require('./jobs/expiryJob');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use("/api/medicines", require("./routes/inventory"));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.sync({ alter: true }); // use alter in dev for convenience
    console.log('DB synced');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      // start cron jobs
      startReminderJob();
      startExpiryJob();
    });
  } catch (err) {
    console.error('Failed to start server', err);
  }
})();
