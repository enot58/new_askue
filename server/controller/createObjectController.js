import Models from '../models/models.js'
import Model from "sequelize";


class CreateObjectController {


    async getAll (request, response) {
        try{

            const allObj = [];

            function retTrueOrFalse(n) {
                if (n) {
                    return 'checked'
                } else {
                    return ''
                }
            }
            const objectOld = await Models.AllObjects.findAll({
                raw: true,
                include: Models.DescriptionObject
            }).then((data) => {
                data.map((d) => {

                    allObj.push({
                        id : d.id,
                        name: d.name,
                        address: d.address,
                        flat: d['description_object.flat'],
                        section: d['description_object.section'],
                        office: d['description_object.office'],
                        metersInFlat: retTrueOrFalse(d['description_object.metersInFlat']),
                        metersInGr: retTrueOrFalse(d['description_object.metersInGr']),
                        systemBolid: retTrueOrFalse(d['description_object.systemBolid']),
                        systemTeplovodohran: retTrueOrFalse(d['description_object.systemTeplovodohran'])
                    })
                })
                console.log(allObj)
                //response.render('createObject')
                response.render('createObject',{
                    object: allObj
                })
            }).catch((err) => {
                console.log(err)
            })
        } catch (e) {
            console.log(e)
        }

    }




    async create (request, response) {
        try {
            const {name} = request.body
            const {address} = request.body
            const {flat} = request.body
            const {section} = request.body
            const {office} = request.body
            const {metersInFlat} = request.body
            const {metersInGr} = request.body
            const {bolid} = request.body
            const {teplovodohran} = request.body





            const descNewObject = await Models.DescriptionObject.create({
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
            })




            /*const {nameMeter} = request.body
            const {typeMeter} = request.body

            console.log(request.body)

            const meters = await Models.Meter.create({
                name: nameMeter,
                typeMeterId: typeMeter
            }).then(() => {
                response.redirect('/createMeters')
            }).catch((err) => {
                console.log(err)
            })*/
        } catch (e) {
            console.log(e)
        }
    }

    /*async editMeter (request, response) {

        try {

            const {nameMeter} = request.body
            const {typeMeter} = request.body
            const {id} = request.params


            const meter = await  Models.Meter.findOne({
                where: {
                    id: id
                }
            })
            await meter.update({
                name: nameMeter,
                //typeMeterId: typeMeter
            }).then(() => {
                return response.redirect('/createMeters')
            }).catch((err) => {
                console.log(err)
            })

        } catch (e) {
            console.log(e)
        }
    }*/

    async deleteObject (request, response) {
        try {
            const {id} = request.params;

            const oldObject = await Models.AllObjects.findOne({
                where: {
                    id: id
                }
            })

            await Models.DescriptionObject.destroy({
                where: {
                    id: oldObject.descriptionObjectId
                }
            }).then(() => {
                Models.AllObjects.destroy({
                    where: {
                        id: id
                    }
                }).then(() => {
                    return response.redirect('/createObject')
                })
            })

            /*Models.Meter.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                return response.redirect('/createMeters')
            }).catch((err) => {
                console.log(err)
            })*/



        } catch (e) {
            console.log(e)
        }
    }
}



export default new CreateObjectController();