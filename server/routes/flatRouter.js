import express from "express";
const router = express.Router();

import flatController from "../controller/flatController.js";

router.get('/', flatController.getAll)


export default router;