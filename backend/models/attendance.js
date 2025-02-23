const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Attendance = sequelize.define('Attendance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  studentId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  present: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  confidence: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = Attendance;