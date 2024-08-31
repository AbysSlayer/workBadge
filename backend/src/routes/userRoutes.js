const router = require("express").Router();
const userMethods = require("../controllers/userController");
const userRouter = router;

//User routes
userRouter.get("/users/findAll", userMethods.findAll);
userRouter.get("/users/findById/:userId", userMethods.findById);
userRouter.get("/users/getUserById/:userId", userMethods.getUserById);
userRouter.post("/users/addUser", userMethods.addUser);
userRouter.put("/users/updateUser/:userId", userMethods.updateUser);
userRouter.put("/users/changePassword/:userId", userMethods.changePassword)
userRouter.delete("/users/deleteUser/:userId", userMethods.deleteUser);
userRouter.post("/users/login", userMethods.login);



module.exports = userRouter;
