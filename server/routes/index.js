// Это основной роутер, к нему подключаются доп.роуты

import express from "express";
const router = express.Router();



import mainRouter from './mainRouter.js'
import createObjectRouter from './adminRouter/createObjectRouter.js'
import adminRouter from './adminRouter/adminRouter.js'
import createTypeMeterRouter from './adminRouter/createTypeMeterRouter.js'
import createMetersRouter from './adminRouter/createMetersRouter.js'
import editObjectRouter from './editObjectRouter.js'
import formSectionRouter from './formSectionRouter.js'
import editSectionRouter from "./editSectionRouter.js";
import createBrandRouter from "./adminRouter/createBrandRouter.js";
import createPriborRouter from "./adminRouter/createPriborRouter.js";
import selectedObjectRouter from "./selectedObjectRouter.js";
import selectedSectionRouter from "./selectedSectionRouter.js";
import selectedFloorRouter from  "./selectedFloorRouter.js"
import typePriborRouter from "./adminRouter/typePriborRouter.js"
import addPropertyRouter from "./adminRouter/addPropertyRouter.js"
import typePriborPropertyRouter from "./adminRouter/typePriborPropertyRouter.js"
import addPriborInFlatRouter from "./addPriborInFlatRouter.js";
import selectedPriborRouter from "./selectedPriborRouter.js"
import allDevicesRouter from "./adminRouter/allDevicesRouter.js";
import selectTypePageRouter from "./selectTypePageRouter.js";
import addHeatMeterRouter from "./addHeatMeterRouter.js";




// Основной роутер (главная страница) должна получать все объекты
router.use('/', mainRouter)
// Создание объекта страница создания объекта (добавить из техзадания) и другие параметры
//
//
//
//
//
// ======================= Админ Панель =================================//
// Админ панель для для создания разных "штук"
router.use('/admin', adminRouter)
// Создание типов счётчиков
router.use('/createTypeMeter', createTypeMeterRouter)
// Создание самих счётчиков
router.use('/createMeters', createMetersRouter)
// Создание объекта
router.use('/createObject', createObjectRouter)
// Создание брендов
router.use('/createBrand', createBrandRouter)
// Создаём приборы
router.use('/createPribor', createPriborRouter)
// Создаём типы приборов
router.use('/typePribor', typePriborRouter)
// Перейти к прибору и добавить свойства
router.use('/typePriborProperty', typePriborPropertyRouter)

// Создаём свойства
router.use('/addProperty', addPropertyRouter);

// Все устройства
router.use('/allDevices', allDevicesRouter)


// ======================= Конец Админ Панели ============================//
//                                                                         //
//                                                                          //
//====================== Редактирование объекта =============================//


// Редактируем
//router.use('/editObject', editObjectRouter)
router.use('/editObject', editObjectRouter)
// Создаём секици
router.use('/formSectionObject',formSectionRouter )
// Переходи к секции для формирования квартир и т.д(пока не ясно)) )
router.use('/editSection', editSectionRouter)

//====================== Конец Редактирование объекта =======================//

//=============Тест для квартета==================//
// Секции тут and Добавить секцию
router.use('/selectedObject', selectedObjectRouter);
// перейти в секцию и добавить этажи
router.use('/selectedSection', selectedSectionRouter)
// перейти в этаж и добавлять квартиры (помещение 1)
router.use('/selectedFloor', selectedFloorRouter)
// Перейти к приборам из этажа для формирование через приборы
router.use('/addPriborInFlat', addPriborInFlatRouter)
// Перейти к прибору и добавить квартиры
router.use('/selectedPribor', selectedPriborRouter)
// Выбор типа
router.use('/selectTypePage', selectTypePageRouter)
// счётчики тепла
router.use('/addHeatMeter', addHeatMeterRouter)


//==================================================//




export default router