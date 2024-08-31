const Sequelize = require("sequelize");
const config = require("../config");

let connection = null;

const createConnection = () => {
  if (!connection) {
    connection = new Sequelize(config.database, config.user, config.password, {
      host: config.host,
      port: config.port,
      dialect: "mariadb",
    });
  }
  return connection;
};

const closeConnection = () => {
  if (connection) {
    connection.close();
    connection = null;
    console.log("Connection closed successfuly");
  }
};

module.exports = methodsDB = {
  createConnection,
  closeConnection,
};
