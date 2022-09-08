import Models from '../models/models.js'


class FormSectionController {

    async getSection(request, response) {
        try {
            // Весь массив
            const getArr = []
            // Получаем id объекта
            const {id} = request.params;
            // Получаем описание объекта , нужно количество секций
            const objOne = await Models.AllObjects.findOne({
                where: {
                    id: id
                }
            })
            const descriptionObjOne = await Models.DescriptionObject.findOne({
                where: {
                    id: objOne.descriptionObjectId
                }
            })
            // Здесь секции
            const allSection = descriptionObjOne.section;
            // Перебираем полученное число и на каждой итерации добавляем в базу
            // Добавляем количество секций без этажей
            // получаем список с секциями
            const haveSection = await Models.Section.findAll({
                where: {
                    objectId: id
                },
                raw: true
            })
            //console.log(haveSection)
            async function addSection(n) {
                for(let i = 1; i <= n; i++){
                    // Мы должны найти эту секцию в секциях , если не найдена тогда создаём
                    const oldSection = await Models.Section.findAll({
                        where: {
                            number: i,
                            objectId: id
                        },
                        raw: true
                    })
                    // Тут создаём если не найдена
                    if (oldSection.length === 0) {
                        const newSection = await Models.Section.create({
                            number: i,
                            objectId: id
                        }).catch((err) => {
                            console.log(err)
                        })
                    }
                }
            }
            // если длинна массива пустая добавляем или если секций меньше в массиве
            // вызываем функцию добавления
            if (haveSection.length === 0 || haveSection.length < allSection) {
                await addSection(allSection)
            } else {
                console.log('Что то есть')
            }
            // Передаём id для формирование ссылок
            const obj = await Models.AllObjects.findOne({
                where: {
                    id: id
                }
            }).then((data) => {
                getArr.push({
                    id: data.id,
                    name: data.name
                })
                response.render('formSectionObject', {
                    object: getArr,
                    section: haveSection
                })
            }).catch((err) => {
                console.log(err)
            })

        } catch (e) {
            console.log(e)
        }
    }

    /*async delSection (request, response) {
        console.log(response.referer)
    }*/

    async addParams (request, response) {
        let path = request.url.split('/');
        let objPath = {
            numberObject: path[1]
        }


        const {id} = request.params;
        const {from} = request.body;
        const {to} = request.body
        const {flat} = request.body
        const {flatInFloor} = request.body
        const {number} =request.body
        const {office} =request.body
        const {pipes} =request.body

        const sectionDesc = await Models.Section.findOne({
            where: {
                id: id,
            }
        })

        console.log(sectionDesc)

        await sectionDesc.update({
            from: from,
            to: to,
            flat: flat,
            flatInFloor: flatInFloor,
            number: number,
            office: office,
            pipes: pipes
        }).then(() => {
            return response.redirect(`/formSectionObject/${objPath.numberObject}`)
        }).catch((err) => {
            console.log(err)
        })


    }
}

export default new FormSectionController();