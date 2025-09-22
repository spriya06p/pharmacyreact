module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Reminder', {
    userId: DataTypes.INTEGER,
    medicineId: DataTypes.INTEGER,
    reminderTime: DataTypes.DATE,
    recurrence: { type: DataTypes.ENUM('NONE','DAILY','WEEKLY'), defaultValue: 'NONE' },
    channel: { type: DataTypes.ENUM('PUSH','SMS','EMAIL'), defaultValue: 'PUSH' },
    active: { type: DataTypes.BOOLEAN, defaultValue: true }
  });
};
