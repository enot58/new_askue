import express from "express";
const router = express.Router();

import selectedPriborController from "../controller/selectedPriborController.js";

router.get('/:id/:id/:id/:id', selectedPriborController.get)
//router.get('/api/getUrl', selectedPriborController.getUrl)
router.post('/:id/:id/:id/:id', selectedPriborController.create)
router.post('/pdf/:id/:id/:id/:id', selectedPriborController.createPdf)

export default router;