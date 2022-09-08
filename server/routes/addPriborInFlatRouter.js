import express from "express";
const router = express.Router();

import addPriborInFlatController from "../controller/addPriborInFlatController.js";

router.get('/:id/:id/:id', addPriborInFlatController.get)
router.post('/:id/:id/:id', addPriborInFlatController.addPribor)
router.post('/move/:id/:id/:id/:id', addPriborInFlatController.move)
router.post('/getExcel/:id/:id/:id/:id', addPriborInFlatController.getExcel)

export default router;