const router = require("express").Router();
const userMethods = require("../controllers/userController");
const userRouter = router;
const multer = require('multer')
const path = require('path')

//Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'assets/'); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Renombrar el archivo
    },
  });
  
  const upload = multer({ storage: storage });

//User routes
userRouter.get("/users/findAll", userMethods.findAll);
userRouter.get("/users/findById/:userId", userMethods.findById);
userRouter.get("/users/getUserById/:userId", userMethods.getUserById);
userRouter.post("/users/addUser", upload.single('profilePicture') ,userMethods.addUser);
userRouter.put("/users/updateUser/:userId", userMethods.updateUser);
userRouter.put("/users/changePassword/:userId", userMethods.changePassword)
userRouter.delete("/users/deleteUser/:userId", userMethods.deleteUser);
userRouter.post("/users/login", userMethods.login);



module.exports = userRouter;
