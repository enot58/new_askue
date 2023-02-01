import {findFlatObjectSection} from "../helpers/objectHelper.js";

class SelectTypePageController {

    async getPage (req, res) {
        try {
            const {idSection, objectId} = req.query

            const flats = await findFlatObjectSection(idSection, objectId)

            res.render('selectTypePage', {
                heatMeter: {
                    idSection: idSection,
                    objectId: objectId
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

}



export default new SelectTypePageController();