const { DataTypes, Model } = require("sequelize");
const methodsDB = require("../database/database");
const sequelize = methodsDB.createConnection();
const User = require("./user.model");

class Request extends Model {}

Request.init(
  {
    reqId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    reqFirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    reqLastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reqWorkerCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reqDepartment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Finished"),
      allowNull: false,
      defaultValue: "Pending",
    },
    // userId: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   references: {
    //     model: User,
    //     key: "userId",
    //   },
    // },
  },
  {
    sequelize,
    modelName: "Request",
    timestamps: true,
  }
);

module.exports = Request;
