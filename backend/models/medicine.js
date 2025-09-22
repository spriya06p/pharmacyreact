module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Medicine', {
    name: { type: DataTypes.STRING, allowNull: false },
    chemicalName: DataTypes.STRING,
    brandName: DataTypes.STRING,
    description: DataTypes.TEXT
  });
};
