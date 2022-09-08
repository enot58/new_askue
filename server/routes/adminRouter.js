import express from "express";
const router = express.Router();

import AdminController from "../controller/adminController.js";

// Рендерим страницу для добавления типов и т.д
router.get('/', AdminController.getPageAdmin)


export default router;