import express from "express";
const router = express.Router();

import selectedObjectController from "../controller/selectedObjectController.js";

router.get('/:id', selectedObjectController.getOne);
router.post('/:id', selectedObjectController.addSection);
router.post('/del/:id/:id', selectedObjectController.dropSection)

export default router;