import Models from '../models/models.js'


class SelectedObjectController {

    async getOne (request, response) {

        try {
            const {id} = request.params;
            const object = await Models.Section.findAll({
                where: {
                    objectId: id
                },
                raw: true
            }).then((data) => {
                response.render(`selectedObject`, {
                    section: data
                })
            }).catch((err) => {
                console.log(err)
            })

        } catch (err) {
            console.log(err)
        }

    }

    async addSection (request, response) {

        try{
            const {id} = request.params;
            console.log(id)

            const object = await Models.Section.findAll({
                where: {
                    objectId: id
                },
                raw: true
            })

            await Models.Section.create({
                number: object.length + 1,
                objectId: id
            }).then(() => {
                response.redirect(`/selectedObject/${id}`)
            }).catch((err) => {
                console.log(err)
            })
        } catch (err) {
            console.log(err)
        }

    }

    async dropSection (request, response) {

        try {
            let path = request.url.split('/');
            let objPath = {
                numberObject: path[2]
            }

            // Id объекта
            const objectId = objPath.numberObject;
            // Id Секции
            const {id} = request.params;

            await Models.Section.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                response.redirect(`/selectedObject/${objectId}`)
            })
        } catch (err) {
            console.log(err)
        }

    }


}



export default new SelectedObjectController();