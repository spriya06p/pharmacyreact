module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Return', {
    medicineStockId: DataTypes.INTEGER,
    pharmacyId: DataTypes.INTEGER,
    vendorId: DataTypes.INTEGER,
    reason: { type: DataTypes.ENUM('UNSOLD','EXPIRED','DAMAGED','OTHER'), defaultValue: 'OTHER' },
    amountRefunded: DataTypes.DECIMAL(10,2)
  });
};
