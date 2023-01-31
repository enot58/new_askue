import express from "express";
import allDevicesController from "../controller/allDevicesController.js";
const router = express.Router();

router.get('/', allDevicesController.getPage)


export default router;