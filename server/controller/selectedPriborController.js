import Models from '../models/models.js'
import fs from 'fs'
import PDFDocument from 'pdfkit-table';
import {findChannelDevice} from "../helpers/deviceHelper.js";

class SelectedPriborController{
    async get (req, res) {
        /*try{
            // Нужно получить и отдать каналы
            // Получим данные из пути
            let path = request.url.split('/');

            let objPath = {
                numberObject: path[1],
                sectionNum: path[2],
                numberFloor: path[3],
                idPribor: path[4],
            }
            /!* return -
            {
                numberObject: '1',
                sectionNum: '1',
                numberFloor: '14',
                idPribor: '4'
            }*!/

            // Передаём путь для возврата назад
            const arrForUrl = []
            arrForUrl.push(objPath)

            function getHotOrCoolTwo (n) {
                let getNum = n % 2

                if (getNum === 0) {
                    return 'Счётчик горячей воды'
                } else {
                    return 'Счётчик холодной воды'
                }
            }
            // Для начала нужно получить общее количество каналов
            const priborNumTest = await Models.PriborNumberChanel.findAll({
                where: {
                    priborNumberId: objPath.idPribor
                },
                raw: true
            })
            /!* return
            {
                id: 40,
                createdAt: 2022-06-20T05:16:55.000Z,
                updatedAt: 2022-06-20T05:16:55.000Z,
                priborNumberId: 4,
                chanelId: 10
            }*!/

            // Получаем все квартиры по прибору в котором находимся
            // НЕ РАБОТАЕТ
            /!*const haveFlat = await Models.PriborNumberChanelFlat.findAll({
                where: {
                    priborNumberChanelId: objPath.idPribor
                },

                raw: true
            })*!/
            const testArr = []
            //
            for (let i = 0; i < priborNumTest.length; i++) {
                testArr.push({
                    idPriborChannel: priborNumTest[i].id
                })
                testArr[i].priborNumberId = priborNumTest[i].priborNumberId
                testArr[i].idPriborNumberChanels = priborNumTest[i].chanelId
                // Получаем все id в приборканалах-квартирах

                const testFlat = await Models.PriborNumberChanelFlat.findAll({
                    where: {
                        //priborNumberId: priborNumTest[i].id
                        priborNumberChanelId: priborNumTest[i].id
                    },
                    raw: true
                }).then(async (data) => {
                    //console.log(data)
                    data.map( async (d) => {
                        testArr[i].flatId = d.flatId

                        const flatOther = await Models.Flats.findOne({
                            where: {
                                id: d.flatId
                            }
                        }).then((dataTwo) => {
                            testArr[i].flatNumber = dataTwo.number
                        })
                    })
                })

                //TODO: Добавить поддержку квартир
                function getSumZ(s) {
                    const oldStr = s
                    const newStr = oldStr.split('.')

                    return `${newStr[0]},${newStr[1]}`
                }

                // Счётчики
                const priborNumberChanelIdMeterId = await Models.PriborNumberChanelNumberMeters.findAll({
                    where: {
                        priborNumberChanelId: priborNumTest[i].id
                    }
                }).then(async (data) => {
                    data.map(async (d) => {
                        testArr[i].priborNumberChanelIdMeterId = d.id
                        testArr[i].meterNumberId = d.meterNumberId

                        const selectedMeters = await Models.MeterNumber.findOne({
                            where: {
                                id: d.meterNumberId
                            }, raw: true
                        }).then((data) => {
                            //console.log(data)
                            testArr[i].numberMeter = data.number
                            testArr[i].sum = data.sum
                            testArr[i].sumTwo = getSumZ(data.sum)
                            testArr[i].typeMeter = getHotOrCoolTwo(data.meterId)
                        })
                    })
                })
                // Если счётчик холодной воды добавим в meterId - 1 иначе горяей 2 - 2
                //testArr[i].metersType = d.id





            }


            //console.log(testArr)
            /!*{
                idPriborChannel: 39,
                 priborNumberId: 4,
                idPriborNumberChanels: 9,
                flatId: 3,
                flatNumber: 321,
                priborNumberChanelIdMeterId: 2,
                meterNumberId: 2,
                numberMeter: 321,
                sum: '321'
            }*!/



            // Рендер страницы
            response.render('selectedPribor', {
                //chanel: priborNumTest,
                chanel: testArr,
                path: arrForUrl
            })
        } catch (err) {
            console.log(err)
        }*/
        try {
            const {objectId,sectionId,floorId,deviceId} = req.query

            const channels = await findChannelDevice(deviceId)


            return res.render('selectedPribor', {
                chanel: channels
            })
        } catch (e) {
            console.log(e)
        }
    }

    async create (request, response) {

        try {
            // Нужно получить и отдать каналы
            // Получим данные из пути
            let path = request.url.split('/');

            let objPath = {
                numberObject: path[1],
                sectionNum: path[2],
                numberFloor: path[3],
                idPribor: path[4],
            }
            /* return -
            {
                numberObject: '1',
                sectionNum: '1',
                numberFloor: '14',
                idPribor: '4'
            }*/

            /*return body -
            {
                idPriborNumberChanels: '31',
                numberMeter: '',
                sumMeter: '',
                flatOrOffice: '2',
                numberFlatOrOffice: ''
            }*/
            // Получаем ответ
            // В ответе номер
            const {numberMeter} = request.body;
            // Показания
            const {sumMeter} = request.body;
            // Выбрана квартира или офис
            const {flatOrOffice} = request.body;
            // Номер квартиры или офиса
            const {numberFlatOrOffice} = request.body;
            // id КаналПрибора
            const {idPriborNumberChanels} = request.body;
            // Добавляем в БД
            // Если квартира

            /*function getHotOrCool (n) {
                let getNum = n % 2

                if (getNum === 0) {
                    return 2
                } else {
                    return 1
                }
            }*/


            if (flatOrOffice === '1') {
                // Получим квартиры и создадим findOrCreate
                const newFlat = await Models.Flats.findOrCreate({
                    where: {
                        number: numberFlatOrOffice,
                        objectId: objPath.numberObject,
                        sectionId: objPath.sectionNum,
                        floorId: objPath.numberFloor
                    },
                    raw: true
                })
                // получим id добавленной квартиры
                const oldFlat = await Models.Flats.findOne({
                    where: {
                        number: numberFlatOrOffice,
                        objectId: objPath.numberObject,
                        sectionId: objPath.sectionNum,
                        floorId: objPath.numberFloor

                    },
                    raw: true
                })
                // Нужно получить priborNumberChanelId и flatId
                // priborNumberChanelId отдаёт в body
                // flatId получен выше
                const priborNumberChanelOld = await Models.PriborNumberChanel.findOne({
                    where: {
                        id: idPriborNumberChanels
                    }, raw: true
                })
                /* return {
                    id: 32,
                    createdAt: 2022-06-20T05:16:55.000Z,
                    updatedAt: 2022-06-20T05:16:55.000Z,
                    priborNumberId: 4,
                    chanelId: 2
                }*/
                await Models.PriborNumberChanelFlat.create({
                    // id взят из body
                    priborNumberChanelId: idPriborNumberChanels,
                    flatId: oldFlat.id
                })
                // Теперь нужно добавить счётчик
                // Делаем привязку со счётчиками
                const newMeter = await Models.MeterNumber.create({
                    number: numberMeter,
                    sum: sumMeter,
                    objectId: objPath.numberObject,
                    sectionId: objPath.sectionNum,
                    floorId: objPath.numberFloor,
                    flatId: oldFlat.id,
                })
                // Получим id созданного счётчика
                const oldMeter = await Models.MeterNumber.findOne({
                    where: {
                        number: numberMeter,
                        objectId: objPath.numberObject,
                        sectionId: objPath.sectionNum,
                        floorId: objPath.numberFloor,
                        flatId: oldFlat.id
                    }
                })
                // Добавляем данные в таблицу PriborNumberChanelNumberMeters
                // Получим её
                const newPriborNumberChanelNumberMeters = await Models.PriborNumberChanelNumberMeters.create({
                    priborNumberChanelId: idPriborNumberChanels,
                    meterNumberId: oldMeter.id
                })
            }
            response.redirect(`/selectedPribor/${objPath.numberObject}/${objPath.sectionNum}/${objPath.numberFloor}/${objPath.idPribor}`)

        } catch (err) {
            console.log(err)
        }

    }


    async createPdf(request, response) {
        /*try {

            const allMeterTwo = [];
            // Нужно получить и отдать каналы
            // Получим данные из пути
            let path = request.url.split('/');

            let objPath = {
                numberObject: path[2],
                sectionNum: path[3],
                numberFloor: path[4],
                idPribor: path[5],
            }
            /!* return -
            {
                numberObject: '1',
                sectionNum: '1',
                numberFloor: '14',
                idPribor: '4'
            }*!/
            console.log(objPath)

            const priborNumTest = await Models.PriborNumberChanel.findAll({
                where: {
                    priborNumberId: objPath.idPribor
                },
                raw: true
            })

            function getHotOrCoolTwo (n) {
                let getNum = n % 2

                if (getNum === 0) {
                    return 'Счётчик горячей воды'
                } else {
                    return 'Счётчик холодной воды'
                }
            }

            for (let i = 0; i < priborNumTest.length; i++) {
                allMeterTwo.push({
                    idPriborChannel: priborNumTest[i].id
                })
                allMeterTwo[i].priborNumberId = priborNumTest[i].priborNumberId
                allMeterTwo[i].idPriborNumberChanels = priborNumTest[i].chanelId
                // Получаем все id в приборканалах-квартирах

                const testFlat = await Models.PriborNumberChanelFlat.findAll({
                    where: {
                        //priborNumberId: priborNumTest[i].id
                        priborNumberChanelId: priborNumTest[i].id
                    },
                    raw: true
                }).then(async (data) => {
                    //console.log(data)
                    data.map( async (d) => {
                        allMeterTwo[i].flatId = d.flatId

                        const flatOther = await Models.Flats.findOne({
                            where: {
                                id: d.flatId
                            }
                        }).then((dataTwo) => {
                            allMeterTwo[i].flatNumber = dataTwo.number
                        })
                    })
                })

                //TODO: Добавить поддержку квартир


                // Счётчики
                const priborNumberChanelIdMeterId = await Models.PriborNumberChanelNumberMeters.findAll({
                    where: {
                        priborNumberChanelId: priborNumTest[i].id
                    }
                }).then(async (data) => {
                    data.map(async (d) => {
                        allMeterTwo[i].priborNumberChanelIdMeterId = d.id
                        allMeterTwo[i].meterNumberId = d.meterNumberId

                        const selectedMeters = await Models.MeterNumber.findOne({
                            where: {
                                id: d.meterNumberId
                            }, raw: true
                        }).then((data) => {
                            //console.log(data)
                            allMeterTwo[i].numberMeter = data.number
                            allMeterTwo[i].sum = data.sum
                            allMeterTwo[i].typeMeter = getHotOrCoolTwo(data.meterId)
                        })
                    })
                })
                // Если счётчик холодной воды добавим в meterId - 1 иначе горяей 2 - 2
                //allMeterTwo[i].metersType = d.id


            }



            //console.log(allMeterTwo)
            /!*{
                idPriborChannel: 61,
                    priborNumberId: 7,
                idPriborNumberChanels: 1,
                flatId: 9,
                flatNumber: 1,
                priborNumberChanelIdMeterId: 6,
                meterNumberId: 8,
                numberMeter: 3425463,
                sum: '1',
                typeMeter: 'Счётчик горячей воды'
            }*!/

            function returnStrOr (str) {
                console.log(str)
                if (str === undefined) {

                    return ' - ';
                } else {
                    return str;
                }
            }
            function createPdf () {

                const doc = new PDFDocument({
                    size: 'A4',
                    layout : 'landscape'
                });
                // Set the font size
                doc.fontSize(18);


                doc.font('./timesnewromanpsmt.ttf')
                    .text('Hello from Times Roman!')
                    .moveDown(0.5);

                doc.pipe(fs.createWriteStream('output.pdf'));


                doc.image('./new_10ch.jpg', 10, 0.5, {scale: 0.48})

                let wName = 95; // = 200 px
                let hName = 35;
                let stepName = 600;

                doc.font('./timesnewromanpsmt.ttf')
                    .fontSize(14)
                    .text(`Секция № ${objPath.sectionNum}`,wName, hName)
                    .moveDown(0.5);
                doc.font('./timesnewromanpsmt.ttf')
                    .fontSize(14)
                    .text(`Этаж № ${objPath.numberFloor}`,wName + stepName, hName)
                    .moveDown(0.5);


                /!*doc.text(`Секция № ${objPath.sectionNum}`, 95 , 40)
                //doc.text("Номер стояка", 350 , 40)
                doc.text(`Этаж № ${objPath.numberFloor}`, 650 , 40);*!/

                // ======================== Добавляем номер номера квартир======================= //
                let ptOne = 140;//215
                let step = 70; //155
                let heightFlat = 448; //465
                /!*doc.font('./timesnewromanpsmt.ttf')
                    .fontSize(14)
                    .text("1", ptOne, heightFlat)
                    .moveDown(0.5);

                doc.font('./timesnewromanpsmt.ttf')
                    .fontSize(14)
                    .text("45", ptOne + step, heightFlat)
                    .moveDown(0.5);


                doc.font('./timesnewromanpsmt.ttf')
                    .fontSize(14)
                    .text("66", ptOne + step * 2 , heightFlat)
                    .moveDown(0.5);

                doc.font('./timesnewromanpsmt.ttf')
                    .fontSize(14)
                    .text("325", ptOne + step * 3 , heightFlat)
                    .moveDown(0.5);*!/
                function addNumberFlat (arr, meterLength, pt, step, height) {

                    for (let i = 0; i < meterLength; i++) {
                        doc.font('./timesnewromanpsmt.ttf')
                            .fontSize(14)
                            .text(`${returnStrOr(arr[i].flatNumber)}`, ptOne + step * i, heightFlat)
                            .moveDown(0.5);
                    }
                }
                //addNumberFlat(allMeterTwo, allMeterTwo.length, ptOne, step, heightFlat)

                // ======================== Номера квартир добавлены =============================//
                //                                                                                 //
                // ======================== Добавляем номера счётчиков ======================= //

                let ptMeter = 130;
                let stepMeter = 70;
                let heightMeter = 480;
                /!*doc.font('./timesnewromanpsmt.ttf')
                    .fontSize(10)
                    .text("123456789", ptMeter, heightMeter)
                //.moveDown(0.5)

                doc.font('./timesnewromanpsmt.ttf')
                    .fontSize(10)
                    .text("123456789", ptMeter + stepMeter, heightMeter)
                //.moveDown(0.5)

                doc.font('./timesnewromanpsmt.ttf')
                    .fontSize(10)
                    .text("123456789", ptMeter + stepMeter * 2, heightMeter)
                //.moveDown(0.5)*!/


                /!*let arrMeter = [
                    {
                        id: 1,
                        number: 123456789,
                        flat: 10,
                        sum: 0.1
                    },
                    {
                        id: 2,
                        number: 123456789,
                        flat: 10,
                        sum: 0.1
                    },
                    {
                        id: 3,
                        number: 123456789,
                        flat: 10,
                        sum: 0.1
                    },
                    {
                        id: 4,
                        number: 123456789,
                        flat: 10,
                        sum: 0.1
                    },
                    {
                        id: 4,
                        number: 123456789,
                        flat: 10,
                        sum: 0.1
                    }
                ]

                console.log(arrMeter[1].number)*!/

                function addNumberMeter (arr, meterLength, pt, step, height) {

                    for (let i = 0; i < meterLength; i++) {

                        doc.font('./timesnewromanpsmt.ttf')
                            .fontSize(10)
                            .text(`${returnStrOr(arr[i].numberMeter)}`, pt + step * i , height)
                    }
                }

                //addNumberMeter(allMeterTwo, allMeterTwo.length, ptMeter, stepMeter, heightMeter);
                // ======================== Номера счётчиков добавлены =============================//

                // ======================== Добавляем показания счётчиков ======================= //

                let ptSum = 140;
                let stepSum = 70;
                let heightSum = 510;

                function addSumMeter (arr, meterLength, pt, step, height) {

                    for (let i = 0; i < meterLength; i++) {

                        doc.font('./timesnewromanpsmt.ttf')
                            .fontSize(10)
                            .text(`${returnStrOr(arr[i].sum)}`, pt + step * i , height)
                    }
                }

                //addSumMeter(allMeterTwo, allMeterTwo.length, ptSum, stepSum, heightSum);

                // ======================== Показания счётчиков добавлены =============================//
                const table = {
                    headers: ["name", 'address'],
                    rows: ['ghg', 'sdfsdf']
                }

                doc.moveDown().table(table, 10, 125, {width: 590})

                doc.end();
            }


            //createPdf();

            function createTablePdf () {
                const docTable = PDFDocumentTable();

            }


            async function createPdfTwo () {
                // table
                const table = {
                    title: "Title",
                    subtitle: "Subtitle",
                    headers: ["Country", "Conversion rate", "Trend"],
                    rows: [
                        ["Switzerland", "12%", "+1.12%"],
                        ["France", "67%", "-0.98%"],
                        ["England", "33%", "+4.44%"],
                    ],
                };
                // A4 595.28 x 841.89 (portrait) (about width sizes)
                // width
                await doc.table(table, {
                    width: 300,
                });
                // or columnsSize
                await doc.table(table, {
                    columnsSize: [200, 100, 100],
                });
                // done!
                doc.end();
            }
            response.redirect(`/selectedPribor/${objPath.numberObject}/${objPath.sectionNum}/${objPath.numberFloor}/${objPath.idPribor}`)

        } catch (err) {
            console.log(err)
        }*/


        try {
            // Нужно получить и отдать каналы
            // Получим данные из пути
            let path = request.url.split('/');

            let objPath = {
                numberObject: path[2],
                sectionNum: path[3],
                numberFloor: path[4],
                idPribor: path[5],
            }
            /*return -
            {
                numberObject: '1',
                    sectionNum: '1',
                numberFloor: '14',
                idPribor: '4'
            }*/
            //console.log(objPath)
            // Получим все каналы
            const priborNumTest = await Models.PriborNumberChanel.findAll({
                where: {
                    priborNumberId: objPath.idPribor
                },
                raw: true
            })
            // Каналы получены , теперь через цикл делаем запросы
            // Получаем через каналы квартиры
            // Получем id для счётчиков
            // идём с этим id в счётчики и достаём номер и показания
            const flats = ["№ Квартиры"];
            const meters = ["№ Счётчика"];
            const sum = ["Показания"];
            for (let i = 0; i < priborNumTest.length; i++) {
                //console.log(priborNumTest[i].id)

                const findOneFlatId = await Models.PriborNumberChanelFlat.findOne({
                    where: {
                        priborNumberChanelId: priborNumTest[i].id
                    },
                    raw: true
                }).then(async (data) => {
                    //console.log(data)
                    try {
                        const findFlat = await Models.Flats.findOne({
                            where: {
                                id: data.flatId
                            },
                            raw: true
                        }).then((dataflat) => {
                            flats.push(dataflat.number)

                        }).catch((err) => {

                            if (err) throw err

                            console.log('Тут я ')
                        })
                    } catch (err) {
                        console.log(err)
                        if (err) {
                            console.log('Ошибка, квартиры нет. Добавим прочерк')
                            flats.push('-')
                        }
                    }
                })

                const findOneMeterId = await Models.PriborNumberChanelNumberMeters.findOne({
                    where: {
                        priborNumberChanelId: priborNumTest[i].id
                    },
                    raw: true
                }).then(async (data) => {
                    try {

                        const findMeter = await Models.MeterNumber.findOne({
                            where: {
                                id: data.meterNumberId
                            },
                            raw: true
                        }).then((dataMeter) => {

                            meters.push(dataMeter.number)
                            sum.push(dataMeter.sum)
                        }).catch((err) => {
                            console.log(err)
                            if (err) {
                                console.log('первая ошибка')
                            }
                        })
                    } catch (err) {
                        //console.log(err)

                        if (err) {

                            console.log('Ошибка, счётчика нет. Добавим прочерк')
                            meters.push('-')
                            console.log('Ошибка, показаний нет. Добавим прочерк')
                            sum.push('-')
                        }
                    }
                })
            }

            const findPribor = await Models.PriborNumber.findOne({
                where: {
                    id: objPath.idPribor
                },
                raw: true
            })

             const findSection = await Models.Section.findOne({
                where: {
                    id: objPath.sectionNum
                }
            })
            const findFloor = await Models.Floors.findOne({
                where: {
                    id: objPath.numberFloor
                }
            })


            /*console.log(flats)
            console.log(meters)
            console.log(sum)*/

            let doc = new PDFDocument({margin: 30, size: 'A4', layout: 'landscape'});
            doc.font('./timesnewromanpsmt.ttf')
            const newDoc = `./Секция_${findSection.number}_Этаж_${findFloor.number}_№${findPribor.number}.pdf`

            const oldDoc = "./document.pdf"
            await doc.pipe(fs.createWriteStream(newDoc));

            const table = {
                title: `Секция №${findSection.number}`,
                subtitle: `Этаж №${findFloor.number}. Прибор № ${findPribor.number}`,
                headers: ["№", "1 - ХВС", "2 - ГВС", "3 - ХВС", "4 - ГВС", "5 - ХВС", "6 - ГВС", "7 - ХВС", "8 - ГВС", "9 - ХВС", "10 - ГВС"],
                rows: [
                    flats,
                    //["№ Квартиры", "123", "123", "321", "321", "641", "311", "232", "232"],
                    meters,
                    //["№ Счётчика", "123456789", "123456789", "123456789", "123456789", "123456789", "123456789", "123456789", "123456789", "123456789", "123456789"],
                    sum
                    //["Показания", "0.123", "0.123", "0.123", "0.123", "0.123", "0.123", "0.123", "0.123", "0.123", "0.123"],
                ],
            };

            await doc.image('./new_10ch_Table.jpg', 1, 20, {width: 800})
                .moveDown(1)

            // the magic (async/await)
            await doc.moveDown(26).table(table, {
                width: 800, prepareHeader: () => doc.font('./timesnewromanpsmt.ttf'),
                prepareRow: () => doc.font('./timesnewromanpsmt.ttf')
            });


            // -- or --
            // doc.table(table).then(() => { doc.end() }).catch((err) => { })

            // if your run express.js server
            // to show PDF on navigator
            // doc.pipe(res);

            // done!

            doc.end()
        
            await response.download(newDoc, (err) => {
                console.log(err)

                if (err) {
                    console.log('Что то есть');
                    let active = false;
                    
                    setTimeout(() => {
                        response.download(newDoc, (err) => {
                            console.log(err);

                            if (err) {
                                console.log('Ошибка внутри')
                            }else {
                                active = true;
                            }
                        })
                    }, 500)
                    
                }
            })


           
            

            /*response.redirect(`/selectedPribor/${objPath.numberObject}/${objPath.sectionNum}/${objPath.numberFloor}/${objPath.idPribor}`)*/

        } catch (err) {
            console.log(err)

            console.log('Ошибка')
        }
    }
}


/*class SelectedPriborController {

    async get (request, response) {
        // Нужно получить и отдать каналы
        // Получим данные из пути
        let path = request.url.split('/');

        let objPath = {
            numberObject: path[1],
            sectionNum: path[2],
            numberFloor: path[3],
            idPribor: path[4],
        }


        const arrForUrl = []


        arrForUrl.push(objPath)
        // Функция распределяет холодную и горячую воду
        function getHotOrCool (n) {
            let getNum = n % 2

            if (getNum === 0) {
                return 'Счётчик горячей воды '
            } else {
                return 'Счётчик холодной воды '
            }
        }

        /!*
        *  Нужно получить :
        *   номер
        *   показания
        *   квартиру
        * *!/
        // Для начала нужно получить общее количество каналов
        const priborNumTest = await Models.PriborNumberChanel.findAll({
            where: {
                priborNumberId: objPath.idPribor
            },
            raw: true
        })

        const haveFlat = await Models.PriborNumberChanelFlat.findAll({
            where: {
                priborNumberChanelId: objPath.idPribor
            },

            raw: true
        })
        const testArr = []

        for (let i = 0; i < priborNumTest.length; i++) {

            //console.log(priborNumTest[i].id)

            testArr.push({
                idPriborChannel: priborNumTest[i].id
            })

            /!*testArr.push({
                idPriborChannel: priborNumTest[i].chanelId
            })*!/

            testArr[i].idPriborNumberChanels = priborNumTest[i].chanelId

            // Получаем все id в приборканалах
            const testFlat = await Models.PriborNumberChanelFlat.findAll({
                where: {
                    priborNumberId: priborNumTest[i].id
                },
                raw: true
            }).then(async (data) => {
                console.log(data)
                data.map( async (d) => {
                    testArr[i].flatId = d.flatId

                    const flatOther = await Models.Flats.findOne({
                        where: {
                            id: d.flatId
                        }
                    }).then((dataTwo) => {
                        testArr[i].flatNumber = dataTwo.number
                    })
                })
            })


            // Получаем номер офиса
            const testOffice = await Models.PriborNumberChanelOffice.findAll({
                where: {
                    priborNumberChanelId: priborNumTest[i].id
                },
            }).then(async (data) => {
                data.map(async (d) => {

                    console.log(d)
                    testArr[i].officeId = d.officeId

                    const officeOther = await Models.Office.findOne({
                        where: {
                            id: d.officeId
                        },
                        raw: true
                    }).then((dataTwo) => {
                        //console.log(dataTwo.number)
                        testArr[i].officeNumber = dataTwo.number
                    })
                })
            })

            // Счётчики
            const priborNumberChanelIdMeterId = await Models.PriborNumberChanelNumberMeters.findAll({
                where: {
                    priborNumberChanelId: priborNumTest[i].id
                }
            }).then((data) => {
                data.map((d) => {
                    testArr[i].priborNumberChanelIdMeterId = d.id
                })
            })



            /!*const priborNum = await Models.PriborNumberChanel.findAll({
                where: {
                    priborNumberId: objPath.idPribor
                },
                raw: true
            }).then(async (dataThree) => {
                dataThree.map((dT) => {
                    //console.log(dT)
                    testArr[i].idPriborNumberChanels = dT.id
                })
            })*!/



        }

        console.log(testArr)


        // Мы получили все каналы выбранного прибора
        // Теперь нужно перебрать массив



        // Получаем id прибора
        /!*const arrPriborNum = []
        const priborNum = await Models.PriborNumberChanel.findAll({
            where: {
                priborNumberId: objPath.idPribor
            },
            raw: true
        }).then((data) => {

            data.map((d) => {
                arrPriborNum.push({
                    id: d.id,
                    priborNumberId: d.priborNumberId,
                    chanelId: d.chanelId,
                    meter: getHotOrCool(d.chanelId)
                })
            })

        })*!/

        // Получаем всю строку прибора
        const fullPribor = await Models.PriborNumber.findOne({
            where: {
                id: objPath.idPribor
            },
            raw :true
        })
        //console.log(fullPribor)
        // Получаем квартиру КаналПрибораКвартира
        //const oldChannelPriborFlat = await Models.PriborNumberChanelFlat.


        //console.log(priborNum)


        response.render('selectedPribor', {
            //chanel: arrPriborNum,
            chanel: testArr,
            path: arrForUrl
        })
    }

    async create(request, response) {
        try {
            //console.log(response)
            //console.log(request)
            let path = request.url.split('/');
            // получаем объект, секцию, этаж
            let objPath = {
                numberObject: path[1],
                sectionNum: path[2],
                numberFloor: path[3],
                idPribor: path[4],
            }
            // id прибора
            const {id} = request.params;
            // Получаем ответ
            // В ответе номер
            const {numberMeter} = request.body;
            // Показания
            const {sumMeter} = request.body;
            // Квартира
            //const {numberFlat} = request.body;
            const {numberFlatOrOffice} = request.body;
            // Квартира или офис
            const {flatOrOffice} = request.body;
            // id КаналПрибора
            const {idPriborNumberChanels} = request.body;
            console.log(idPriborNumberChanels)
            // Добавляем в БД
            // Если квартира


            if (flatOrOffice === '1') {

                // Получим квартиры и создадим findOrCreate
                const newFlat = await Models.Flats.findOrCreate({
                    where: {
                        number: numberFlatOrOffice,
                        objectId: objPath.numberObject,
                        sectionId: objPath.sectionNum,
                        floorId: objPath.numberFloor
                    },
                    raw: true
                })
                // получим id добавленной квартиры
                const oldFlat = await Models.Flats.findOne({
                    where: {
                        number: numberFlatOrOffice,
                        objectId: objPath.numberObject,
                        sectionId: objPath.sectionNum,
                        floorId: objPath.numberFloor

                    },
                    raw: true
                })

                /!*console.log(id)
                console.log(idPriborNumberChanels)
*!/
                // Нужно получить priborNumberChanelId и flatId
                // flatId получен выше
                //Получаем id priborNumberChanelId
                const priborNumberChanelOld = await Models.PriborNumberChanel.findOne({
                    /!*where: {
                        priborNumberId: id,
                        chanelId: idPriborNumberChanels
                    },
                    raw: true*!/
                    // Замена!!!!
                    where: {
                        id: idPriborNumberChanels
                    }
                })

                //console.log(priborNumberChanelOld)
                await Models.PriborNumberChanelFlat.create({
                    priborNumberChanelId: priborNumberChanelOld.id,
                    flatId: oldFlat.id
                })

                // Теперь нужно добавить счётчик
                // Делаем привязку со счётчиками
                const newMeter = await Models.MeterNumber.create({
                    number: numberMeter,
                    sum: sumMeter,
                    objectId: objPath.numberObject,
                    sectionId: objPath.sectionNum,
                    floorId: objPath.numberFloor,
                    flatId: oldFlat.id
                })
                // Получим id созданного счётчика
                const oldMeter = await Models.MeterNumber.findOne({
                    where: {
                        number: numberMeter,
                        objectId: objPath.numberObject,
                        sectionId: objPath.sectionNum,
                        floorId: objPath.numberFloor,
                        flatId: oldFlat.id
                    }
                })

                // Добавляем данные в таблицу PriborNumberChanelNumberMeters
                // Получим её
                const newPriborNumberChanelNumberMeters = await Models.PriborNumberChanelNumberMeters.create({
                    priborNumberChanelId: priborNumberChanelOld.id,
                    meterNumberId: oldMeter.id
                })





            } else if (flatOrOffice === '2') {
                // Получим квартиры и создадим findOrCreate
                const newOffice = await Models.Office.findOrCreate({
                    where: {
                        number: numberFlatOrOffice,
                        objectId: objPath.numberObject,
                        sectionId: objPath.sectionNum,
                        floorId: objPath.numberFloor

                    },
                    raw: true
                })
                // получим id добавленной квартиры
                const oldOffice = await Models.Office.findOne({
                    where: {
                        number: numberFlatOrOffice,
                        objectId: objPath.numberObject,
                        sectionId: objPath.sectionNum,
                        floorId: objPath.numberFloor

                    },
                    raw: true
                })
                /!*console.log(oldOffice.id)*!/

                // Нужно получить priborNumberChanelId и flatId
                // flatId получен выше
                //Получаем id priborNumberChanelId
                const priborNumberChanelOldTwo = await Models.PriborNumberChanel.findOne({
                    /!*where: {
                        priborNumberId: id,
                        chanelId: idPriborNumberChanels
                    }*!/
                    where: {
                        id: idPriborNumberChanels
                    }
                })

                await Models.PriborNumberChanelOffice.create({
                    priborNumberChanelId: priborNumberChanelOldTwo.id,
                    officeId: oldOffice.id
                })

                // Теперь нужно добавить счётчик
                // Делаем привязку со счётчиками
                const newMeter = await Models.MeterNumber.create({
                    number: numberMeter,
                    sum: sumMeter,
                    objectId: objPath.numberObject,
                    sectionId: objPath.sectionNum,
                    floorId: objPath.numberFloor,
                    officeId: oldOffice.id
                })




                // Цепляем к квартире сам прибор
                const oldPribor = await Models.PriborNumber.findOne({
                    where: {
                        id: id
                    },
                    row: true
                })
                await oldPribor.update({
                    flatId: oldFlat.id
                })
            }


            response.redirect(`/selectedPribor/${objPath.numberObject}/${objPath.sectionNum}/${objPath.numberFloor}/${id}`)
        } catch (err) {
            console.log(err)
        }
    }


}*/

export default new SelectedPriborController();