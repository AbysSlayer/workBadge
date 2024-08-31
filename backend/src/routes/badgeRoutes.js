const router = require("express").Router();
const badgeMethods = require("../controllers/badgeController");
const badgeRouter = router;

//Routes
badgeRouter.get("/badges/findAll", badgeMethods.findAll);
badgeRouter.get("/badges/badgesPerMonth", badgeMethods.badgesPerMonth);
badgeRouter.get("/badges/detailedBadgesPerMonth/:year/:month", badgeMethods.detailedBadgesPerMonth);
badgeRouter.post("/badges/addBadge", badgeMethods.addBadge);
badgeRouter.get("/badges/findById/:solUserId", badgeMethods.findById);
badgeRouter.delete("/badges/deleteBadge/:solUserId/:badgeId", badgeMethods.deleteBadge);

module.exports = badgeRouter;
