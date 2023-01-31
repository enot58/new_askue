import Models from '../models/models.js'


class CreatePriborController {


    async getAll (request, response) {
        let allMeters = []
        try {
            const typeMeter = await Models.TypeMeter.findAll({raw: true})
            const brands = await Models.Brands.findAll({raw: true})
            const meters = await Models.Meter.findAll(
                {
                    raw: true,
                    include: [Models.TypeMeter, Models.Brands]

                }
            ).then((data) => {
                console.log(data)
                data.map((d) => {
                    allMeters.push({
                        id: d.id,
                        name: d.name,
                        typeMeterId: d.typeMeterId,
                        typeMeterName: d['type_meter.name'],
                        brandId: d['brand.id'],
                        brandName: d['brand.name']
                        /*allTypeMeters: [
                            typeMeter
                        ]*/
                    })
                })
            })


            response.render('createPribor', {
                meters: allMeters,
                typeMeter: typeMeter,
                brands: brands

            })
        } catch (e) {
            console.log(e)
        }
    }

    async create (request, response) {
        try {
            const {nameMeter} = request.body
            const {typeMeter} = request.body
            const {brand} = request.body;
            console.log(brand)

            console.log(request.body)

            const meters = await Models.Meter.create({
                name: nameMeter,
                typeMeterId: typeMeter,
                brandId: brand
            }).then(() => {
                response.redirect('/createMeters')
            }).catch((err) => {
                console.log(err)
            })
        } catch (e) {
            console.log(e)
        }
    }

    async editMeter (request, response) {

        try {

            const {nameMeter} = request.body
            const {typeMeter} = request.body
            const {brand} = request.body
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
    }

    async deleteMeter (request, response) {
        try {
            const {id} = request.params;

            Models.Meter.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                return response.redirect('/createMeters')
            }).catch((err) => {
                console.log(err)
            })



        } catch (e) {
            console.log(e)
        }
    }
}



export default new CreatePriborController();