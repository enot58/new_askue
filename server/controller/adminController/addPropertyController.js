import Models from '../../models/models.js'


class AddPropertyController {
    async getAll (request, response) {
        try {
            const allProperty = await Models.NameProperty.findAll({raw: true})
            response.render('addProperty', {
                property: allProperty
            })
        } catch (e) {
            console.log(e)
        }
        //response.render('addProperty')
    }

    async create(request, response) {
        try {
            const {property} = request.body
            console.log(property)
            const nameProperty = await Models.NameProperty.create({
                name: property
            }).then(() => {
                response.redirect('/addProperty')
            })
        } catch (e) {
            console.log(e)
        }
    }

    async edit (request, response) {
        try {
            const {property} = request.body;
            const {id} = request.params;

            const nameProperty = await Models.NameProperty.findOne({
                where: {
                    id: id
                }
            })
            await nameProperty.update({
                name: property
            }).then(() => {
                //return response.redirect('/admin')
                response.redirect('/addProperty')
            }).catch((err) => {
                console.log(err)
            })

        } catch (e) {
            console.log(e)
        }
    }

    async deleteProperty (request, response) {
        try {
            const {id} = request.params;

            Models.NameProperty.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                return response.redirect('/addProperty')
            }).catch((err) => {
                console.log(err)
            })



        } catch (e) {
            console.log(e)
        }
    }
}


export default new AddPropertyController();