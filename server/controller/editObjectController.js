import Models from '../models/models.js'


class EditObjectController {

    async getOne (request, response) {
        let objArr = []
        const {id} = request.params;
        function retTrueOrFalse(n) {
            if (n) {
                return 'checked'
            } else {
                return ''
            }
        }
        const obj = await Models.AllObjects.findOne({
            where: {
                id: id
            },
            raw: true,
            include: Models.DescriptionObject
        }).then((data) => {

                objArr.push({
                    id : data.id,
                    name: data.name,
                    address: data.address,
                    flat: data['description_object.flat'],
                    section: data['description_object.section'],
                    office: data['description_object.office'],
                    metersInFlat: retTrueOrFalse(data['description_object.metersInFlat']),
                    metersInGr: retTrueOrFalse(data['description_object.metersInGr']),
                    systemBolid: retTrueOrFalse(data['description_object.systemBolid']),
                    systemTeplovodohran: retTrueOrFalse(data['description_object.systemTeplovodohran'])
                })

            response.render('editObject', {
                object: objArr
            })
        }).catch((err) => {
            console.log(err)
        })


    }

    async editOne (request, response) {
        const {id} = request.params;
        console.log(request.body)

        //response.redirect(`/editObject/${id}`)

        try {

            const {name} = request.body
            const {address} = request.body
            const {flat} = request.body
            const {section} = request.body
            const {office} = request.body
            const {metersInFlat} = request.body
            const {metersInGr} = request.body
            const {systemBolid} = request.body
            const {systemTeplovodohran} = request.body

            const newObj = await Models.AllObjects.findOne({
                where: {
                    id: id
                }
            })

            if(name || address) {
                await newObj.update({
                    name :name,
                    address: address,
                }).then(() => {
                    //return response.redirect(`/editObject/${id}`)
                }).catch((err) => {
                    console.log(err)
                })
            }
            // Найдём параметры объекта
            const newObjDesc = await Models.DescriptionObject.findOne({
                where: {
                    id: id
                }
            })

            // Если нет атрибута в body и есть в БД нужно вернуть пустую строку
            // ЕСЛи нет атрибута и нет в БД - false
            // Если есть адрибут и нет в БД - возвращаем атрибут
            // Еслти есть атрибут и есть в БД - возвращаем атрибут
            function retFalseOrTrue(atr) {
                if (!atr && `newObjDesc.${atr}`) {

                    return `newObjDesc.${atr}`
                }else if (!atr && !`newObjDesc.${atr}`) {
                    return false
                }else if (atr && !`newObjDesc.${atr}`) {
                    return atr
                } else if (atr && `newObjDesc.${atr}`){
                    return atr
                }
            }
            if (flat || section || office || metersInGr || metersInFlat || bolid || teplovodohran) {
                await newObjDesc.update({
                    id: newObjDesc.id,
                    flat: flat,
                    section: section,
                    office: office,
                    metersInFlat: retFalseOrTrue(metersInFlat),
                    metersInGr: retFalseOrTrue(metersInGr),
                    systemBolid: retFalseOrTrue(systemBolid),
                    systemTeplovodohran: retFalseOrTrue(systemTeplovodohran)
                }).then(() => {
                    return response.redirect(`/editObject/${id}`)
                }).catch((err) => {
                    console.log(err)
                })
            }



            /*await newObj.update({
                name :name,
                address: address,
            }).then(() => {
                return response.redirect(`/editObject/${id}`)
            }).catch((err) => {
                console.log(err)
            })*/

            /*const descNewObject = await Models.DescriptionObject.create({
                flat: flat,
                section: section,
                office: office,
                metersInFlat: metersInFlat,
                metersInGr: metersInGr,
                systemBolid: bolid,
                systemTeplovodohran: teplovodohran
            }).catch((err) => {
                console.log(err)
            })

            const newObject = await Models.AllObjects.create({
                name: name,
                address: address,
                descriptionObjectId: descNewObject.id
            }).then(() => {
                return response.redirect('/createObject')
            }).catch((err) => {
                console.log(err)
            })*/



        } catch (e) {
            console.log(e)
        }
    }

}


export default new EditObjectController();