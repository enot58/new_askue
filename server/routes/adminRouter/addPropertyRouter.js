import express from "express";
const router = express.Router();

import addPropertyController from "../../controller/adminController/addPropertyController.js"

router.get('/', addPropertyController.getAll)
router.post('/', addPropertyController.create)
router.post('/:id', addPropertyController.edit)
router.post('/del/:id', addPropertyController.deleteProperty)

export default router;