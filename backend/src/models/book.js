"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsTo(models.Category, {
        foreignKey: "categoryId",
        targetKey: "id",
        as: "categoryData",
      });
      Book.hasOne(models.History, {
        foreignKey: "bookId",
        as: "bookData",
      });
    }
  }
  Book.init(
    {
      name: DataTypes.STRING,
      author: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      image: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
