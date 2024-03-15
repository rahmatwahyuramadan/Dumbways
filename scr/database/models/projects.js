'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  projects.init({
    project: DataTypes.STRING,
    date1: DataTypes.DATE,
    date2: DataTypes.DATE,
    description: DataTypes.TEXT,
    node: DataTypes.STRING,
    next: DataTypes.STRING,
    react: DataTypes.STRING,
    golang: DataTypes.STRING,
    image: DataTypes.STRING,
    author: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'projects',
  });
  return projects;
};