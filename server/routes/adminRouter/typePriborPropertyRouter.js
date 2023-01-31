import express from "express";
const router = express.Router();

import typePriborPropertyController from "../../controller/adminController/typePriborPropertyController.js";

router.get('/:id', typePriborPropertyController.getOne)
router.post('/:id', typePriborPropertyController.create)


export default router;