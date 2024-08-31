const router = require("express").Router();
const requestMethods = require("../controllers/requestController");
const reqRouter = router;

reqRouter.get("/requests/findAll", requestMethods.reqFindAll);
reqRouter.get("/requests/findByWC/:reqWorkerCode", requestMethods.findByWorkerCode);
reqRouter.post("/requests/addRequest", requestMethods.addRequest);
reqRouter.delete("/requests/deleteByWC/:reqWorkerCode", requestMethods.deleteRequest);

module.exports = reqRouter;
