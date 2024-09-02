const { user } = require("../config");
const Requests = require("../models/request.model");
const User = require("../models/user.model");
const Users = require("../models/user.model");

const reqFindAll = async (req, res) => {
  const requests = await Requests.findAll();
  res.status(200).json({
    ok: true,
    status: 200,
    body: requests,
  });
  console.log(requests);
};

const addRequest = async (req, res) => {
  const {reqFirstName, reqLastName, reqWorkerCode, reqDepartment} = req.body;
  console.log(req.body)
  if (!reqFirstName || reqFirstName.trim() === '') {
    return res.status(400).json({ message: 'El nombre es obligatorio.' });
  }
  if (!reqLastName || reqLastName.trim() === '') {
    return res.status(400).json({ message: 'El apellido es obligatorio.' });
  }
  if (!reqWorkerCode || reqWorkerCode.trim() === '') {
    return res.status(400).json({ message: 'El código de trabajador es obligatorio.' });
  }
  if (!reqDepartment || reqDepartment.trim() === '') {
    return res.status(400).json({ message: 'El departamento es obligatorio.' });
  }
  try {
    await Requests.sync();
    const reqWorker = reqWorkerCode;
    console.log(reqWorker);
    const reqExists = await Requests.findOne({
      where: {
        reqWorkerCode: reqWorker,
      },
    });
    if (reqExists != null && reqExists.status == 'Pending') {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "User already has a request pending",
      });
    }
    const userExists = await Users.findOne({
      where: {
        workerCode: reqWorker,
      },
    });
    console.log(userExists);
    if (!userExists) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "User not found",
      });
    }
    if (reqExists == null && userExists != null) {
      const createRequest = await Requests.create({
        reqFirstName: reqFirstName,
        reqLastName: reqLastName,
        reqWorkerCode: reqWorkerCode,
        reqDepartment: reqDepartment,
        userId: userExists.userId,
      });
      console.log(createRequest);
      await userExists.update({ reqId: createRequest.reqId });
      //await userExists.addRequest(createRequest);

      res.status(201).json({
        ok: true,
        status: 201,
        message: "Request added successfuly",
        data: createRequest,
      });
    } 

    if(reqExists != null && reqExists.status == 'Finished' && userExists !=null){
      const updateUser = await Users.update(
        {reqId: null},
        {where: {
          reqId: reqExists.reqId
        }}
      )

      const deleteRequest = await Requests.destroy({
        where: {
          userId: userExists.userId
        }
      })

      const createRequest = await Requests.create({
        reqFirstName: reqFirstName,
        reqLastName: reqLastName,
        reqWorkerCode: reqWorkerCode,
        reqDepartment: reqDepartment,
        userId: userExists.userId,
      });
      console.log(createRequest);
      await userExists.update({ reqId: createRequest.reqId });
      res.status(201).json({
        ok: true,
        status: 201,
        message: "Request Added successfuly",
      });

    }
  } catch (error) {
    console.log(error);
  }
};

const findByWorkerCode = async (req, res) => {
  const workerCode = req.params.reqWorkerCode;
  const request = await Requests.findAll({ where: { reqWorkerCode: workerCode } });
  return res.status(200).json({
    requests: request
  });
};

const deleteRequest = async (req, res) => {
  try {
    const wc = req.params.reqWorkerCode;
    console.log(wc);
    const deleteRequest = Requests.destroy({
      where: {
        reqWorkerCode: wc,
      },
    });
    res.status(201).json({
      ok: true,
      status: 201,
      message: "Request Deleted successfuly",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  reqFindAll,
  addRequest,
  findByWorkerCode,
  deleteRequest,
};
