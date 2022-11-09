/*
* Здесь обрабрабатываем роутер TypeController
* импортируется express , router Expressa и контроллер TypeController
* из папки контроллеров
* */

import express from "express";
const router = express.Router();

import MainController from '../controller/mainController.js'

// Просто рендерим  главную страницу
//router.get('/', MainController.getMainPage)
router.get('/', MainController.getOnePage)


export default router;