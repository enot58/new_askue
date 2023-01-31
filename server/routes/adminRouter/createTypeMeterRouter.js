import express from "express";
const router = express.Router();
//const urlencodedParser = express.urlencoded({extended: false});



import CreateTypeMeterController from '../controller/createTypeMeterController.js';



// Рендерим создание типов счётчиков и создание
router.get('/', CreateTypeMeterController.getAll)
router.post('/', CreateTypeMeterController.create)
router.post('/:id', CreateTypeMeterController.edit)
router.post('/del/:id', CreateTypeMeterController.deleteType);

export default router;
