import Models from '../models/models.js'


class SelectedSectionController {

    async getAll (request, response) {
        try {
            let allFloors = []

            let path = request.url.split('/');
            let objPath = {
                numberObject: path[1]
            }
            // Id объекта
            const objectId = objPath.numberObject;
            // Id Секции
            const {id} = request.params;

            const floor = await Models.Floors.findAll({
                where: {
                    sectionId: id,
                    objectId: objectId
                },
                raw: true
            }).then((data) => {

                response.render(`selectedSection`, {
                    floors: data
                })
            })

        } catch (err) {
            console.log(err)
        }

    }

    async addFloor (request, response) {
        try {
            let path = request.url.split('/');
            let objPath = {
                numberObject: path[1]
            };
            // Id объекта
            const objectId = objPath.numberObject;
            // Id Секции
            const {id} = request.params;

            const {floorNumber} = request.body
            const floorsAll = await Models.Floors.findAll({
                where: {
                    sectionId: id,
                    objectId: objectId
                }
            })


            if (!floorNumber) {
                await Models.Floors.create({
                    number: floorsAll.length + 1,
                    sectionId: id,
                    objectId: objectId
                }).then(() => {
                    response.redirect(`/selectedSection/${objectId}/${id}`)
                }).catch((err) => {
                    console.log(err)
                })
            } else {
                await Models.Floors.create({
                    number: floorNumber ,
                    sectionId: id,
                    objectId: objectId
                }).then(() => {
                    response.redirect(`/selectedSection/${objectId}/${id}`)
                }).catch((err) => {
                    console.log(err)
                })
            }


        } catch (err) {
            console.log(err)
        }
    }



    async dropFloor (request, response) {
        try {
            console.log(request.url)
            let path = request.url.split('/');

            let objPath = {
                numberObject: path[1],
                sectionNum: path[3]
            }

            // Id объекта
            const objectId = objPath.numberObject;
            // Id Секции
            const {id} = request.params;

            const sectionNum = objPath.sectionNum

            await Models.Floors.destroy({
                where: {
                    id :id
                }

            }).then(() => {
                response.redirect(`/selectedSection/${objectId}/${sectionNum}`)
            })

        } catch (err) {
            console.log(err)
        }
    }
}


export default new SelectedSectionController();