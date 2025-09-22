module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Vendor', {
    name: DataTypes.STRING,
    contactName: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.TEXT
  });
};
