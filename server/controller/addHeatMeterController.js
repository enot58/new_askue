import Models from "../models/models.js";

class AddHeatMeterController {

    async getPage (req, res) {
        try {
            const {idSection, objectId} = req.query

            // ищем этажи для select
            const floors = await Models.Floors.findAll({
                where: {
                    sectionId: idSection,
                    objectId: objectId
                },
                raw: true
            })

            // Получим этажи
            const flats = await Models.Flats.findAll({
                where: {
                    sectionId: idSection,
                    objectId: objectId
                },
                raw: true,
                include: [Models.Floors ,Models.AllObjects]
            })

            let listFlats = []

            for (const flat of flats) {
                const {sectionId, objectId, floorId, id: flatId} = flat


            }
            console.log(flats)

            res.render("addHeatMeter", {
                    floors: floors,
                    flats: flats
                }
            )
        } catch (e) {
            console.log(e)
        }
    }

}

export default new AddHeatMeterController();