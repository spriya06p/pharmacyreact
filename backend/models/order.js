module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Order', {
    userId: DataTypes.INTEGER,
    pharmacyId: DataTypes.INTEGER,
    totalAmount: DataTypes.DECIMAL(10,2),
    paymentStatus: { type: DataTypes.ENUM('PENDING','PAID','FAILED','REFUNDED'), defaultValue: 'PENDING' }
  });
};
