const { Sequelize } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("postgres", "postgres", "123456", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection database successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = connectDB;
