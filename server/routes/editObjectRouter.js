import express from "express";
const router = express.Router();
import EditObjectController from '../controller/editObjectController.js'


// Рендерим создание типов счётчиков и создание
router.get('/:id', EditObjectController.getOne)
router.post('/edit/:id', EditObjectController.editOne)




export default router;