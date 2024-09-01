const Users = require("../models/user.model");
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const Request = require("../models/request.model");
const Badge = require("../models/badge.model");
const User = require("../models/user.model");
const { password } = require("../config");


const findAll = async (req, res) => {
  const users = await Users.findAll();
  res.status(200).json({
    ok: true,
    status: 200,
    body: users
  });
};

const addUser = async (req, res) => {
  const profilePicture = req.file ? `http://localhost:3000/assets/${req.file.filename}` : null;
  console.log(profilePicture)
  const dataUser = req.body;
  console.log(dataUser);
  await Users.sync();
  const createUser = await Users.create({
    userId: dataUser.userId,
    username: dataUser.username,
    password: dataUser.password,
    firstName: dataUser.firstName,
    lastName: dataUser.lastName,
    workerCode: dataUser.workerCode,
    department: dataUser.department,
    profilePicture: profilePicture  
  });
  const token = jwt.sign({user: createUser, id: dataUser.userId, username: dataUser.username}, 'tu_secreto', {expiresIn: '1h'});
  return res.json({"success": true,'user': createUser ,"token": token, "userId": dataUser.userId, 'workerCode': dataUser.workerCode, 'role': "client"})
  // res.status(201).json({
  //   ok: true,
  //   status: 201,
  //   message: "User added successfuly",
  // });
};

const findById = async (req, res) => {
  const id = req.params.userId;
  console.log(id);
  const user = await Users.findOne({
    where: {
      userId: id,
    },
  });
  console.log(user)
  res.status(200).json({
    exists: !!user,
  });
};

const getUserById = async (req, res) => {
  const id = req.params.userId;
  console.log(id);
  const user = await Users.findOne({
    where: {
      userId: id,
    },
  });
  console.log(user)
  res.status(200).json({
    body: user
  });
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.userId;
    console.log(id);
    const deleteUser = Users.destroy({
      where: {
        userId: id,
      },
    });
    const deleteRequest = Request.destroy({
      where: {   
        userId: id
      }
    })
    const deleteBadge = Badge.destroy({
      where: {
        userId: id
      }
    })
    res.status(204).json({
      ok: true,
      status: 204,
      body: deleteUser,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.userId;
    const dataUser = req.body;
    console.log(dataUser)

    const updatedFields = {};
    if (dataUser.username != '') updatedFields.username = dataUser.username;
    if (dataUser.firstName != '') updatedFields.firstName = dataUser.firstName;
    if (dataUser.lastName != '') updatedFields.lastName = dataUser.lastName;
    if (dataUser.password != '') updatedFields.password = dataUser.password;
    if (dataUser.workerCode != '') updatedFields.workerCode = dataUser.workerCode;
    if (dataUser.department != '') updatedFields.department = dataUser.department;
    if (dataUser.role != '') updatedFields.role = dataUser.role;

    console.log(updatedFields)
    const updateUser = await Users.update(
      updatedFields,
      {
        where: {
          userId: id,
        },
      }
    );
    res.status(200).json({
      ok: true,
      status: 200,
      body: updateUser,
    });
  } catch (error) {
    console.log(error);
  }
}

const changePassword = async (req, res) =>{
  const userId = req.params.userId
  const {newPassword} = req.body
  console.log(req.body)
  try {
    const user = await Users.findByPk(userId)
    if(!user){
      return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
    }
    console.log(user)
    user.password = newPassword
    await user.save()
    return res.json({ success: true, message: 'Contraseña cambiada exitosamente.' });
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    return res.status(500).json({ success: false, message: 'Error interno del servidor.' });
  }
}

const login = async (req, res) =>{
  const loginData = req.body
  try {
    const user = await Users.findOne({where: {username: loginData.username, password: loginData.password}})
    console.log(user)
    if(user){
      console.log("user found, login in!")
      const token = jwt.sign({id: user.userId, username: user.username}, 'tu_secreto', {expiresIn: '1h'});
      console.log(token)
      return res.json({"success": true, "token": token, "userId": user.userId, 'workerCode': user.workerCode, 'role': user.role})
    }else{
      return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }
  } catch (error) {
    
  }
}

module.exports = userMethods = {
  findAll,
  addUser,
  findById,
  deleteUser,
  updateUser,
  login,
  getUserById,
  changePassword
};
