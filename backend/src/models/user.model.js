const { DataTypes, Model } = require("sequelize");
const methodsDB = require("../database/database");
const Request = require("./request.model");
const Badge = require("./badge.model");

const sequelize = methodsDB.createConnection();
class User extends Model {}

User.init(
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    workerCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hasSolapin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    role: {
      type: DataTypes.STRING,
      defaultValue: "client"
    },

    reqId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Request,
        key: "reqId",
      },
      defaultValue: null,
    },
    badgeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Badge,
        key: "badgeId",
      },
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "User",
    timestamps: false,
  }
);

module.exports = User;
