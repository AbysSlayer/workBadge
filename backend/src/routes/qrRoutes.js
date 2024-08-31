import { Router } from "express";
import { methodsQr as qrController } from "../controllers/QrController.js";

const qrRouter = Router();

qrRouter.get("/qrcode/findAll", qrController.findAll);
qrRouter.post("/qrcode/addQr", qrController.addQr);

export default qrRouter;
