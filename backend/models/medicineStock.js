module.exports = (sequelize, DataTypes) => {
  return sequelize.define('MedicineStock', {
    pharmacyId: DataTypes.INTEGER,
    batchNo: DataTypes.STRING,
    dosage: DataTypes.STRING,
    quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
    unitPrice: DataTypes.DECIMAL(10,2),
    manufactureDate: DataTypes.DATEONLY,
    expiryDate: DataTypes.DATEONLY,
    vendorId: DataTypes.INTEGER,
    isSold: { type: DataTypes.BOOLEAN, defaultValue: false }
  });
};
