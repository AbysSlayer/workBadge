const app = require("./app");
const methodsDB = require("./database/database");

const sequelize = methodsDB.createConnection();

const main = () => {
  app.listen(app.get("port"));
  console.log(`Server on port ${app.get("port")}`);
  // sequelize.sync();
};

main();
