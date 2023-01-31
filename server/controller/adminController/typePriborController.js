import Models from '../../models/models.js'


class TypePriborController {
    async getAll (request, response) {
        try {
            const allPribor = await Models.Pribors.findAll({raw: true})
            response.render('typePribor', {
                type: allPribor
            })
        } catch (e) {
            console.log(e)
        }
        //response.render('typePribor')
    }

    async create(request, response) {
        try {
            const {typePribor} = request.body
            console.log(typePribor)
            const nameProperty = await Models.Pribors.create({
                name: typePribor
            }).then(() => {
                response.redirect('/typePribor')
            })
        } catch (e) {
            console.log(e)
        }
    }

    async delete (request, response) {
        try {
            const {id} = request.params;

            Models.Pribors.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                return response.redirect('/typePribor')
            }).catch((err) => {
                console.log(err)
            })

        } catch (e) {
            console.log(e)
        }
    }
}


export default new TypePriborController();