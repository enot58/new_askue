import express from "express";
const router = express.Router();


import CreateMetersController from '../controller/createMetersController.js'


// Рендерим создание счётчиков и создание
router.get('/', CreateMetersController.getAll)
router.post('/', CreateMetersController.create)
router.post('/edit/:id', CreateMetersController.editMeter)
router.post('/del/:id', CreateMetersController.deleteMeter);

export default router;
