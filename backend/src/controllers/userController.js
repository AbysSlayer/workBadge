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
  console.log(req.body);
  const {userId, username, password, firstName, lastName, workerCode, department} = req.body;
  if (!userId || userId.trim() === '' || userId.length != 11) {
    return res.status(400).json({ message: 'La contraseña es obligatoria y debe tener 11 caracteres.' });
  }
  if (!username || username.trim() === '') {
    return res.status(400).json({ message: 'El nombre de usuario es obligatorio.' });
  }
  if (!password || password.trim() === '') {
    return res.status(400).json({ message: 'La contraseña es obligatoria.' });
  }
  if (!firstName || firstName.trim() === '') {
    return res.status(400).json({ message: 'El nombre es obligatorio.' });
  }
  if (!lastName || lastName.trim() === '') {
    return res.status(400).json({ message: 'El apellido es obligatorio.' });
  }
  if (!workerCode || workerCode.trim() === '') {
    return res.status(400).json({ message: 'El código de trabajador es obligatorio.' });
  }
  if (!department || department.trim() === '') {
    return res.status(400).json({ message: 'El departamento es obligatorio.' });
  }

  try {
    await Users.sync();
    const createUser = await Users.create({
    userId: userId,
    username: username,
    password: password,
    firstName: firstName,
    lastName: lastName,
    workerCode: workerCode,
    department: department,
  });
  const token = jwt.sign({user: createUser, id: userId, username: username}, 'tu_secreto', {expiresIn: '1h'});
  return res.json({"success": true,'user': createUser ,"token": token, "userId": userId, 'workerCode': workerCode, 'role': "client"})
  // res.status(201).json({
  //   ok: true,
  //   status: 201,
  //   message: "User added successfuly",
  // });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ message: 'Error al registrar el usuario.' });
  }

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
  const userId = req.params.userId;

  try {
    
    await Users.update({
      reqId: null,
      badgeId: null
    }, {
      where: {
        userId: userId
      }
    })
    // Eliminar las solicitudes del usuario
    await Request.destroy({
      where: {
        userId: userId
      }
    });

    // Eliminar las referencias al usuario en la tabla de solapines
    await Badge.update({
      userId: null
    }, {
      where: {
        userId: userId
      }
    });

    // Eliminar el usuario
    const deletedUser = await Users.destroy({
      where: {
        userId: userId
      }
    });

    if (deletedUser === 1) {
      res.status(200).json({
        message: 'Usuario eliminado correctamente'
      });
    } else {
      res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({
      message: 'Error al eliminar el usuario'
    });
  }
};

const updateUser = async (req, res) => {
  const {username, password, firstName, lastName, workerCode, department} = req.body;
  try {
    const id = req.params.userId;
    console.log('User Data: ',username, password, firstName, lastName, workerCode, department)

    const updatedFields = {};
    if (username != '') updatedFields.username = username;
    if (firstName != '') updatedFields.firstName = firstName;
    if (lastName != '') updatedFields.lastName = lastName;
    if (password != '') updatedFields.password = password;
    if (workerCode != '') updatedFields.workerCode = workerCode;
    if (department != '') updatedFields.department = department;

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
      return res.json({ success: false, message: 'Credenciales inválidas' });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
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
