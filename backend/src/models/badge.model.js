const { DataTypes, Model } = require("sequelize");
const methodsDB = require("../database/database");

const sequelize = methodsDB.createConnection();

class Badge extends Model {}

Badge.init(
  {
    badgeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    solFirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    solLastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    solWorkerCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    
  },
  {
    sequelize,
    modelName: "Badge",
    timestamps: true,
  }
);

module.exports = Badge;
