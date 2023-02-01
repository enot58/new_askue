import express from "express";
import addHeatMeterController from "../controller/addHeatMeterController.js";
const router = express.Router();


router.get('/', addHeatMeterController.getPage)


export default router;