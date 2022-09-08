import express from "express";
const router = express.Router();

import typePriborController from '../controller/typePriborController.js'

router.get('/', typePriborController.getAll)
router.post('/', typePriborController.create)
router.post('/del/:id', typePriborController.delete)


export default router;