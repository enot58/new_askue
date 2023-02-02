import Models from "../models/models.js";

class AddHeatMeterController {

    async getPage (req, res) {
        try {
            const {idSection, objectId} = req.query
            // Получим этажи
            const flats = await Models.Flats.findAll({
                where: {
                    sectionId: idSection,
                    objectId: objectId
                },
                raw: true,
                include: Models.Floors
            })

            console.log(flats)

            res.render("addHeatMeter", {
                flats: flats
            })
        } catch (e) {
            console.log(e)
        }
    }

}

export default new AddHeatMeterController();