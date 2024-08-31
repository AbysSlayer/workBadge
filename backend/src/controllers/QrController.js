import { methodsDB } from "./../database/database.js";
import { methods as userController } from "../controllers/userController.js";

const findAll = async (req, res) => {
  try {
    const connection = await methodsDB.createConnection();
    const result = await connection.query("SELECT * FROM qrcode");
    res.json(result);
    await methodsDB.closeConnection;
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const addQr = async (req, res) => {
  try {
    const { id_user } = req.body;
    const user = { id_user };
    if (userExists(user)) {
      const qr = { id_user };
      const connection = await methodsDB.createConnection();
      const result = await connection.query("INSERT INTO qrcode SET ?", qr);
      const id_qr = result.insertId;
      console.log(id_qr);
      console.log(user);
      await connection.query("UPDATE user SET id_qr = ? WHERE id = ?", [id_qr, user]);
      res.json(result);
    } else {
    }
  } catch (error) {
    res.status(500);
    res.send("User doesnt exists in the database");
  }
};

const userExists = async (id_user) => {
  try {
    const connection = await methodsDB.createConnection();
    const result = await connection.query("SELECT * FROM user WHERE id = ?", id_user);
    console.log(result);
    await methodsDB.closeConnection;
  } catch (error) {
    console.log("User doesnt exists in the database.");
  }
};

export const methodsQr = {
  findAll,
  addQr,
};
