import express from "express";
const router = express.Router();

import selectedFloorController from "../controller/selectedFloorController.js";


router.get('/', selectedFloorController.get)



export default router;