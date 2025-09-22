module.exports = (sequelize, DataTypes) => {
  return sequelize.define('OrderItem', {
    orderId: DataTypes.INTEGER,
    medicineStockId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10,2)
  });
};
