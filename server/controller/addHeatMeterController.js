
class AddHeatMeterController {

    async getPage (req, res) {
        try {
            res.render("addHeatMeter")
        } catch (e) {
            console.log(e)
        }
    }

}

export default new AddHeatMeterController();