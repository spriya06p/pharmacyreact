module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    phone: { type: DataTypes.STRING, unique: true },
    passwordHash: DataTypes.STRING,
    role: { type: DataTypes.ENUM('USER','VENDOR','PHARMACY'), defaultValue: 'USER' },
    isRegularCustomer: { type: DataTypes.BOOLEAN, defaultValue: false }
  });
};
