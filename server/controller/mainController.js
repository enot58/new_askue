import Models from '../models/models.js'



class MainController {

    async getMainPage (request, response) {
        try{

            const allObj = [];
            
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

    async getOnePage (req, res) {
        try {
            function retTrueOrFalse(n) {
                if (n) {
                    console.log(n);
                    return true
                } else {
                    console.log(n);
                    return false
                }
            }
            const objectOld = await Models.AllObjects.findAll({
                raw: true,
                include: Models.DescriptionObject
            })
            
            


            const newArr = await objectOld.map((data) => {
                console.log(data['description_object.metersInFlat'] != null ? true : false);
               return {
                id: data.id,
                name: data.name,
                flat: data['description_object.flat'],
                section: data['description_object.section'],
                office: data['description_object.office'],
                metersInFlat: data['description_object.metersInFlat'] != null ? true : false,
                metersInGr: data['description_object.metersInGr'] != null ? true : false,
                systemBolid: data['description_object.systemBolid'] != null ? true : false,
                systemTeplovodohran: data['description_object.systemTeplovodohran'] != null ? true : false,
                address: data.address,
               }
            })
        
            await res.render('index', {
                object: newArr
            })
            
        } catch (e) {
            console.log(`Внутри catch__${e}`);
        }
    }


}



export default new MainController();