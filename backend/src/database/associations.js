const User = require("../models/user.model");
const Request = require("../models/request.model");
const Badge = require("../models/badge.model");

User.hasOne(Request, {
  foreignKey: "userId",
});
User.hasOne(Badge, { foreignKey: "userId" });
Request.belongsTo(User, { foreignKey: "reqId" });
