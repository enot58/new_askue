import Models from '../models/models.js'

class EditSectionController {

    async getOne(request, response) {
        let path = request.url.split('/');
        let objPath = {
            numberObject: path[1]
        }

        // Id объекта
        const objectId = objPath.numberObject;
        // Id Секции
        const {id} = request.params;
        // Получаем объект
        const objectOne = await Models.AllObjects.findOne({
            while: {
                id: objectId
            },
            raw: true
        })
        // Получаем описание
        const objectDesc = await Models.DescriptionObject.findOne({
            while: {
                objectId: objectId
            },
            raw: true
        })
        // Получаем секцию
        const sectionObj = await  Models.Section.findOne({
            while: {
                id: id,
                objectId: objectId
            },
            raw: true
        })

        console.log(objectOne)
        console.log(objectDesc)
        console.log(sectionObj)


        response.render(`editSection`)
    }


}



export default new EditSectionController();


