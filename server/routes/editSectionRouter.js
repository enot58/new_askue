import express from "express";
const router = express.Router();

import EditSectionController from "../controller/editSectionController.js";



router.get('/:id/:id', EditSectionController.getOne);
//router.post();



export default router;