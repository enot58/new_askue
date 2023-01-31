import express from "express";
const router = express.Router();

import CreatePriborController from '../../controller/adminController/createPriborController.js'


router.get('/', CreatePriborController.getAll)





export default router;