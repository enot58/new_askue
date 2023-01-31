import Models from '../models/models.js'



class MainController {

    async getMainPage (request, response) {
        try{

            const allObj = [];
            //==========================
            /*const pribors = await Models.Pribors.findAll({
                raw :true,
                include: [Models.NameProperty]
            })*/

            //console.log(pribors)

            // ============================
            function retTrueOrFalse(n) {
                if (n) {

                    return true
                } else {
                    return false
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

                response.render('index',{
                    object: allObj
                })
            }).catch((err) => {
                console.log(err)
            })
        } catch (e) {
            console.log(e)
        }

    }


}



export default new MainController();