const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.FLOAT, 
      defaultValue: 0,
      validate: {
        max:100,
        min: 0
      }
    }, 
    steps: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
    }, 
    image: {
      type: DataTypes.TEXT
    }, 
  });
};

