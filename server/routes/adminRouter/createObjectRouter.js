// Здесь роут создания объекта

import express from "express";
const router = express.Router();
import CreateObjectController from '../../controller/adminController/createObjectController.js'


// Рендерим создание объектов и создание
router.get('/', CreateObjectController.getAll)
router.post('/', CreateObjectController.create)
//router.post('/edit/:id', CreateMetersController.editMeter)
router.post('/del/:id', CreateObjectController.deleteObject);


export default router;