"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.Book, {
        foreignKey: "bookId",
        targetKey: "id",
        as: "bookData",
      });
      History.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "userData",
      });
    }
  }
  History.init(
    {
      userId: DataTypes.INTEGER,
      bookId: DataTypes.INTEGER,
      borrowedDate: DataTypes.STRING,
      returnDate: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "History",
    }
  );
  return History;
};
