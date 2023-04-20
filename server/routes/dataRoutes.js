import express from "express";
import * as dataController from "../controllers/dataController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/getroominfos", verifyToken, dataController.getRoomInfos);
router.get("/getroomdevices", verifyToken, dataController.getRoomDevices);
router.post("/getdevicedetail", verifyToken, dataController.getDeviceDetail);
router.get("/getFan", verifyToken, dataController.getFan);
router.get("/getavgtemp", verifyToken, dataController.getAvgTemp);
router.get("/getavghumi", verifyToken, dataController.getAvgHumi);
router.get("/getavgdevice", verifyToken, dataController.getAvgDevice);
router.get("/getnotifications", verifyToken, dataController.getNotifications);
router.post("/setautofan", verifyToken, dataController.setAutoFan);
router.get("/getuserlog", verifyToken, dataController.getUserLog);
router.post("/chartempdata", verifyToken, dataController.getChartTempData);
router.post("/charhumidata", verifyToken, dataController.getChartHumiData);
// router.get("/lasthumidity", verifyToken, dataController.lastHumidity);
// router.get("/lastsoildmoisture", verifyToken, dataController.lastSoildMoisture);
// router.get("/lastfan", verifyToken, dataController.lastFan);
// router.get("/lastlight", verifyToken, dataController.lastLight);
// router.get("/lastmode", verifyToken, dataController.lastMode);
// router.get("/lastpump", verifyToken, dataController.lastPump);
// router.get("/notifications", verifyToken, dataController.getNotifications);
// router.get("/temperatures", verifyToken, dataController.getTemperatures);
// router.get("/humidities", verifyToken, dataController.getHumidities);
router.get("/daytemperatures", verifyToken, dataController.getDayTemperatures);
router.get("/dayhumidities", verifyToken, dataController.getDayHumidities);
// router.get(
//   "/daysoildmoistures",
//   verifyToken,
//   dataController.getDaySoildMoistures
// );

router.post("/setfan", verifyToken, dataController.setFan);
// router.post("/setmode", verifyToken, dataController.setMode);
// router.post("/setlight", verifyToken, dataController.setLight);
// router.post("/setpump", verifyToken, dataController.setPump);

export default router;
