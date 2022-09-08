import express from "express";
const router = express.Router();

import FormSectionController from "../controller/formSectionController.js";

// Здесь мы передаём id, name на страницу и формируем секции
router.get('/:id', FormSectionController.getSection)
// Здесь удаление секций, при этом желательно изменить значения везде в объекте
//router.post('/del/:id', FormSectionController.delSection)
// Здесь добавление этажей => У этажей есть квартиры => У квартир есть приборы или может счётчики
router.post('/:id/addParams/:id', FormSectionController.addParams)




export default router;