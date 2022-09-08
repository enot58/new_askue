import Models from '../models/models.js'

class CreateBrandController {
    async getAll (request, response) {
        try {
            const brandsAll = await Models.Brands.findAll({raw: true})
            response.render('createBrand', {
                type: brandsAll
            })
        } catch (e) {
            console.log(e)
        }
    }

    async create (request, response) {
        try {
            const {nameBrand} = request.body
            console.log(nameBrand)
            const brandsAll = await Models.Brands.create({
                name: nameBrand
            }).then(() => {
                response.redirect('createBrand')
            })
        } catch (e) {
            console.log(e)
        }
    }

    async edit (request, response) {
        try {
            const {nameBrand} = request.body;
            const {id} = request.params;

            const brandsAll = await Models.Brands.findOne({
                where: {
                    id: id
                }
            })
            await brandsAll.update({
                name: nameBrand
            }).then(() => {
                //return response.redirect('/admin')
                return response.redirect('/createBrand')
            }).catch((err) => {
                console.log(err)
            })

        } catch (e) {
            console.log(e)
        }
    }

    async deleteType (request, response) {
        try {
            const {id} = request.params;

            Models.Brands.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                return response.redirect('/createBrand')
            }).catch((err) => {
                console.log(err)
            })



        } catch (e) {
            console.log(e)
        }
    }
}

export default new CreateBrandController();