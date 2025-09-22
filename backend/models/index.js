const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const User = require('./user')(sequelize, DataTypes);
const Medicine = require('./medicine')(sequelize, DataTypes);
const MedicineStock = require('./medicineStock')(sequelize, DataTypes);
const Reminder = require('./reminder')(sequelize, DataTypes);
const Vendor = require('./vendor')(sequelize, DataTypes);
const Order = require('./order')(sequelize, DataTypes);
const OrderItem = require('./OrderItem')(sequelize, DataTypes);
const ReturnModel = require('./return')(sequelize, DataTypes);

// associations
Medicine.hasMany(MedicineStock, { foreignKey: 'medicineId' });
MedicineStock.belongsTo(Medicine, { foreignKey: 'medicineId' });

User.hasMany(Reminder, { foreignKey: 'userId' });
Reminder.belongsTo(User, { foreignKey: 'userId' });

Vendor.hasMany(MedicineStock, { foreignKey: 'vendorId' });
MedicineStock.belongsTo(Vendor, { foreignKey: 'vendorId' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

MedicineStock.hasMany(OrderItem, { foreignKey: 'medicineStockId' });
OrderItem.belongsTo(MedicineStock, { foreignKey: 'medicineStockId' });

module.exports = {
  sequelize,
  User,
  Medicine,
  MedicineStock,
  Reminder,
  Vendor,
  Order,
  OrderItem,
  ReturnModel
};
