import express from "express";
const router = express.Router();




import CreateBrandController from "../controller/createBrandController.js";



// Рендерим создание типов счётчиков и создание
router.get('/', CreateBrandController.getAll)
router.post('/', CreateBrandController.create)
router.post('/:id', CreateBrandController.edit)
router.post('/del/:id', CreateBrandController.deleteType);

export default router;
