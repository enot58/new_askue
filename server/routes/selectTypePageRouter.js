import express from "express";
import selectTypePageController from "../controller/selectTypePageController.js";
const router = express.Router();


router.get('/:id', selectTypePageController.getPage)


export default router;