const { user } = require("../config");
const Badges = require("../models/badge.model");
const Requests = require("../models/request.model");
const Users = require("../models/user.model");
const sequelize = require('sequelize')
const {Op} = require('sequelize')


const findAll = async (req, res) => {
  const badges = await Badges.findAll();
  res.status(200).json({
    ok: true,
    status: 200,
    body: badges,
  });
};

const addBadge = async (req, res) => {
  try {
    const dataBadge = req.body;
    console.log(dataBadge);
    await Badges.sync();
    const uWorkerCode = dataBadge.reqWorkerCode;
    const reqExists = await Requests.findOne({
      where: {
        reqWorkerCode: uWorkerCode,
      },
    });
    if (!reqExists) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "User does not have a request. Please create one",
      });
    }
    console.log(reqExists);
    const userExists = await Users.findOne({
      where: {
        workerCode: uWorkerCode,
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
    const badgeExists = await Badges.findOne({ where: { solWorkerCode: uWorkerCode } });
    if (badgeExists) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "User already has a badge",
      });
    }
    console.log(badgeExists);

    const createBadge = await Badges.create({
      solFirstName: dataBadge.reqFirstName,
      solLastName: dataBadge.reqLastName,
      solWorkerCode: dataBadge.reqWorkerCode,
      userId: userExists.userId,
    });
    await userExists.update({ badgeId: createBadge.badgeId, hasSolapin: true });
    await reqExists.update({ status: "Finished" });
    res.status(201).json({
      ok: true,
      status: 201,
      message: "Badge added successfuly",
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteBadge = async (req, res) => {
  try {
    const uId = req.params.solUserId;
    console.log(uId);

    const updateUser = await Users.update(
      {badgeId: null},
      {  where: {
        badgeId: req.params.badgeId
      }}
    )

    const deleteBadge = Badges.destroy({
      where: {
        userId: uId,
      },
    });
    res.status(201).json({
      ok: true,
      status: 201,
      message: "Badge Deleted successfuly",
    });
  } catch (error) {
    console.log(error);
  }
};

const findById = async (req, res) => {
  const uId = req.params.solUserId;
  console.log(uId);

  const badge = await Badges.findOne({ where: { solUserId: uId } });

  res.status(200).json({
    ok: true,
    status: 200,
    body: badge,
  });
};

const badgesPerMonth = async (req, res) => {
  try {
    const results = await Badges.findAll({
      attributes: [
        [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%m'), 'Fecha'],
        [sequelize.fn('COUNT', sequelize.col('badgeId')), 'amount']
      ],
      group: ['Fecha'],
      order: [[sequelize.col('Fecha'), 'ASC']]
    });
    res.json(results);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al obtener los datos' });
  }
};

const detailedBadgesPerMonth = async (req, res) => {
  const { month, year } = req.params;
  try {
    const badges = await Badges.findAll({  
      where: {
        [Op.and]: [
          sequelize.where(sequelize.fn('MONTH', sequelize.col('createdAt')), month),
          sequelize.where(sequelize.fn('YEAR', sequelize.col('createdAt')), year)
        ]
      }
    });
    res.json(badges);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al obtener los datos' });
  }
};

module.exports = {
  findAll,
  addBadge,
  findById,
  deleteBadge,
  badgesPerMonth,
  detailedBadgesPerMonth
};
