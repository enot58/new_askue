import express from "express";
const router = express.Router();

import selectedSectionController from "../controller/selectedSectionController.js";


router.get('/:id/:id', selectedSectionController.getAll)
router.post('/:id/:id', selectedSectionController.addFloor)
router.post('/:id/delFloor/:id/:id', selectedSectionController.dropFloor)


export default router;