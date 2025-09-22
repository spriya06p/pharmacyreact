const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Medicine extends Model {}

Medicine.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    brand_name: { type: DataTypes.STRING, allowNull: false },
    chemical_name: { type: DataTypes.STRING },
    dosage: { type: DataTypes.STRING },
    manufacture_date: { type: DataTypes.DATE },
    expiry_date: { type: DataTypes.DATE },
    description: { type: DataTypes.TEXT },
  },
  { sequelize, modelName: 'Medicine', timestamps: false }
);

module.exports = Medicine;
