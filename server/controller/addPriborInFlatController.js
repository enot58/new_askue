import Models from '../models/models.js'
import Model, {Sequelize} from "sequelize";

import exportMetersToExcel from "../helpers/exportService.js";

class AddPriborInFlatController {

    async get (request, response) {
        try {
            //console.log(request.url)
            let path = request.url.split('/');

            let objPath = {
                numberObject: path[1],
                sectionNum: path[2],
                numberFloor: path[3],
            }


            // Id объекта
            const objectId = objPath.numberObject;
            //console.log(`Object ${objectId}`)
            // Id секции
            const sectionId = objPath.sectionNum;
            //console.log(sectionId)
            // Id Этажа
            const {id} = request.params;
            //console.log(id)
            // получим все приборы
            const pribors = await Models.Pribors.findAll({
                raw: true
            })

            const testPribor = await Models.PriborNumber.findAll({
                where: {
                    objectId: objectId,
                    sectionId: sectionId,
                    floorId: id
                },
                raw: true
            }).then((data) => {

                response.render('addPriborInFlat', {
                    pribor: pribors,
                    data : data
                })
            })


        } catch (err) {
            console.log(err)
        }


    }

    async addPribor (request, response) {
        try {
            //console.log(request.url)
            let path = request.url.split('/');

            let objPath = {
                numberObject: path[1],
                sectionNum: path[2],
                numberFloor: path[3],
            }

            // Id объекта
            const objectId = objPath.numberObject;
            //console.log(`Object ${objectId}`)
            // Id секции
            const sectionId = objPath.sectionNum;
            console.log(sectionId)
            // Id Этажа
            const {id} = request.params;
            //console.log(id)
            // Поучаем из тела прибор и номер
            const {pribor} = request.body;
            const {numberPribor} = request.body;


            // Создаём новый прибор
            const newPriborNumber = await Models.PriborNumber.create({
                number: numberPribor,
                priborId: pribor,
                objectId: objectId,
                sectionId: sectionId,
                floorId :id
            }).then(() => {
                console.log('yes')
            })

            // Нужно подвязать новый прибор в таблицу с каналами
            // Получим сам прибор
            const oldPriborNumber = await Models.PriborNumber.findOne({
                where: {
                    number: numberPribor
                },
                raw: true
            })
            console.log(oldPriborNumber)



            // Получим свойства приборов
            const arrNew = []
            const propertyOldPribor = await Models.ValueProperty.findAll({
                where: {
                    priborId: oldPriborNumber.priborId
                },
                include: Models.NameProperty,
                // Уникальные данные
                /*attributes: [
                    [Sequelize.fn('DISTINCT', Sequelize.col('namePropertyId')) ,'namePropertyId'],
                ],*/
                raw: true
            }).then((data) => {
                data.map((d) => {
                    arrNew.push({
                        id: d.id,
                        name: d['name_property.name'],
                        value: d.value
                    })
                })
            })

            console.log(arrNew)
            // Получим значения приборов

            // Перебираем все свойства и сравниваем
            for(let i = 0; i < arrNew.length; i++) {
                if (arrNew[i].name === 'Количество каналов') {
                   for (let l = 0; l < arrNew[i].value; l++ ) {

                       const t = await Models.PriborNumberChanel.findOrCreate({
                           where: {
                               priborNumberId: oldPriborNumber.id,
                               chanelId: l + 1
                           }
                       })
                   }

                }
            }

            /*if () {

            }*/

            response.redirect(`/addPriborInFlat/${objectId}/${sectionId}/${id}`)

        } catch (err) {
            console.log(err)
        }
    }

    async move (request, response) {

        try {
            let path = request.url.split('/');
            let objPath = {
                numberObject: path[2],
                sectionNum: path[3],
                numberFloor: path[4],
                numberPribor: path[5]
            }
            const { numberFloor } = request.body

            const priborOne = await Models.PriborNumber.findOne({
                where: {
                    id: objPath.numberPribor,
                    objectId: objPath.numberObject,
                    sectionId: objPath.sectionNum,
                    floorId: objPath.numberFloor
                }
            })

            const floorOne = await Models.Floors.findOne({
                where: {
                    number: numberFloor,
                    objectId: objPath.numberObject,
                    sectionId: objPath.sectionNum
                },
                raw: true
            })
            console.log(priborOne)
            console.log(floorOne.id)

            await priborOne.update({
                floorId: floorOne.id
            }).then(() => {
                response.redirect(`/addPriborInFlat/${objPath.numberObject}/${objPath.sectionNum}/${objPath.numberFloor}`)
            })
        } catch (err) {
            console.log(err)
        }



    }

    async getExcel (request, response) {
        try {
            let path = request.url.split('/');
            let objPath = {
                numberObject: path[2],
                sectionNum: path[3],
                numberFloor: path[4],
                numberPribor: path[5]
            }
            //console.log(objPath)

            const mainObj = []

            // нужен объект вот такого типа
            const objType = {
                numberChannel: 1,
                typeRoom: 'Квартира',
                numberRoom: 2,
                typeMeter: 'ХВС',
                namePribor: 'Пульсар 10М',
                typeTwoForASKUE: 'ХВС',
                numberMeter: 2344
            }



            // Получаем прибор
            const pribors = await Models.PriborNumber.findOne({
                where: {
                    id: objPath.numberPribor
                }
            }).catch((err) => {
                console.log(err)
            })



            // Нам нужны каналы одного прибора
            const priborNumberChannel = await Models.PriborNumberChanel.findAll({
                where: {
                    priborNumberId: pribors.id
                },
                raw: true
            }).then(async (data) => {

                for (let i = 0; i < data.length; i++) {
                    const getTypePribor = (ch) => {
                        let x = ch % 2

                        if (x === 0) {
                            return 'ГВС'
                        } else {
                            return 'ХВС'
                        }
                    }

                    const getResurs = (ch) => {
                        let x = ch % 2

                        if (x === 0) {
                            return `Объём2(м3)`
                        } else {
                            return `Объём1(м3)`
                        }
                    }



                    const findOneChannel = await Models.Chanel.findOne({
                        where: {
                            id: data[i].chanelId
                        },
                        raw: true
                    })
                    mainObj.push({
                        typePlace: 'Квартира',
                        priborNumberChannelId: data[i].id,
                        channelId: findOneChannel.id,
                        channel: findOneChannel.number,
                        typeMeter: getTypePribor(findOneChannel.number),
                        priborNumber: pribors.number,
                        namePribor: 'Пульсар10-М',
                        paramRes: getResurs(findOneChannel.number),
                        flats: '',
                        serNumberMeter: ''
                    })
                }
                // Теперь достанем все каналы
            })
            // Переберём массив и добавим квартиры
            async function pushFlats () {
                for (let i = 0; i < mainObj.length; i++) {
                    // Получаем id квартиры
                    const idFlats = await Models.PriborNumberChanelFlat.findOne({
                        where: {
                            priborNumberChanelId: mainObj[i].priborNumberChannelId
                        },
                        raw: true
                    })

                    async function getFlat (i) {

                        try {
                            const flats = await Models.Flats.findOne({
                                where: {
                                    id: idFlats.flatId
                                },
                                raw: true
                            }).then((dataFlats) => {
                                mainObj[i].flats = dataFlats.number;

                                //console.log(mainObj[i].flats)
                             })


                        } catch (e) {
                            console.log('Наконец то поймал')
                        }

                    }

                    await getFlat(i)



                }
            }
            await pushFlats()

            // Переберём массив и достанем счётчики
            async function pushMeter () {
                for (let i = 0; i < mainObj.length; i++) {
                    const idMeter = await Models.PriborNumberChanelNumberMeters.findOne({
                        where: {
                            priborNumberChanelId: mainObj[i].priborNumberChannelId
                        },
                        raw: true
                    })

                    async function getMeter(i) {
                        try {
                            const meter = await Models.MeterNumber.findOne({
                                where: {
                                    id: idMeter.meterNumberId
                                },
                                raw: true
                            }).then((data) => {
                                mainObj[i].serNumberMeter = data.number
                            })
                        } catch (e) {
                            console.log('Поймал ошибку счётчика')
                        }
                    }

                    await getMeter(i)
                }
            }
            await pushMeter()
            /*{
                priborNumberChannelId: 155,
                channelId: 5,
                channel: 5,
                typeMeter: 'ХВС',
                priborNumber: 123456654,
                namePribor: 'Пульсар 10М',
                paramRes: 'Объём1(м3)',
                flats: 444,
                serNumberMeter: 12224444
            }*/
            console.log(mainObj)

            const workSheetColumnName = [
                'Тип места',
                'Имя места',
                'Ресурс',
                'Параметр ресурса',
                'Вторичный прибор',
                'Параметер вторичного прибора',
                'Сетевой адрес',
                'Первичный прибор',
                'Серийный номер первичного прибора'
            ]

            const section = await Models.Section.findOne({
                where: {
                    id: objPath.sectionNum
                }
            })
            const floor = await Models.Floors.findOne({
                where: {
                    id: objPath.numberFloor
                }
            })

            const workSheetName = 'Основная';

            const filePath = `./priborXlsx/${pribors.number}_${section.number}_${floor.number}.xlsx`

            exportMetersToExcel(mainObj, workSheetColumnName, workSheetName, filePath)

            await response.download(filePath, (err) => {
                console.log(err)

                if (err) {
                    console.log('Что то есть');
                    let active = false;

                    setTimeout(() => {
                        response.download(filePath, (err) => {
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

        } catch (err) {
            if (err) {
                console.log(err)
                console.log(`Ошибочка ${err}`)
            }
        }



    }
}


export default new AddPriborInFlatController();


