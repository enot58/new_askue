import Models from '../../models/models.js'

class TypePriborPropertyController {

    async getOne (request, response) {

        try {
            // Получим id прибора
            const {id} = request.params;
            //console.log(id)
            // Получим сам прибор
            const pribor = await Models.Pribors.findAll({
                where: {
                    id: id
                },
                raw: true
            })
            //console.log(pribor)
            // Получаем все свойства
            const property = await Models.NameProperty.findAll({
                raw: true
            })
            //console.log(property)
            // Передаём все свойства и значения
            // Нужно получить value по прибору , передадим id прибора
            const mainProperty = []
            const value = await Models.ValueProperty.findAll({
                where: {
                    priborId: id,
                },
                include: [Models.Pribors, Models.NameProperty],
                raw: true
            }).then((data) => {
                data.map((d) => {
                    mainProperty.push({
                        id: d.id,
                        value: d.value,
                        priborId: d.priborId,
                        priborName: d['pribor.name'],
                        priborPropertyId: d['name_property.id'],
                        nameProperty: d['name_property.name']
                    })
                })
            })



            response.render(`typePriborProperty`, {
                data: pribor,
                property: property,
                allProperty: mainProperty
            })
        } catch (err) {
            console.log(err)
        }
    }


    async create (request, response) {

        //Получаем id прибора
        const {id} = request.params
        //console.log(id)
        // Получаем body
        // Значение свойства
        const {valueProperty} = request.body
        // Выбранное свойство
        const {selProperty} = request.body
        //console.log(valueProperty)
        //console.log(selProperty)
        // Найдём свойство
        const findProperty = await Models.NameProperty.findOne({
            where: {
                id: selProperty
            }
        })

        // Если есть связь с каналами создаём и подвязываем к таблице
        if (findProperty.name === 'Количество каналов') {

            for (let i = 0; i <= valueProperty; i++ ) {
                const chanel = await Models.Chanel.findOrCreate({
                    where: {
                        number: i + 1
                    }
                })
            }
        }


        // Получаем таблицу со значениями value, namePropertyId, priborId
        const valuePribor = await Models.ValueProperty.create({
            value: valueProperty,
            namePropertyId: selProperty,
            priborId: id
        }).then(() => {
            response.redirect(`/typePriborProperty/${id}`)
        })
    }


}



export default new TypePriborPropertyController();