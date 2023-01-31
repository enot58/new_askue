import Models from '../../models/models.js'
import Model from "sequelize";

class CreateTypeMeterController {
    async getAll (request, response) {
        try {
            const typeMeter = await Models.TypeMeter.findAll({raw: true})
            response.render('createTypeMeter', {
                type: typeMeter
            })
        } catch (e) {
            console.log(e)
        }
    }

    async create (request, response) {
        try {
            const {nameTypeMeter} = request.body
            console.log(nameTypeMeter)
            const typeMeter = await Models.TypeMeter.create({
                name: nameTypeMeter
            }).then(() => {
                response.redirect('createTypeMeter')
            })
        } catch (e) {
            console.log(e)
        }
    }

    async edit (request, response) {
        try {
            const {nameTypeMeter} = request.body;
            const {id} = request.params;

            const typeMeter = await Models.TypeMeter.findOne({
                where: {
                    id: id
                }
            })
            await typeMeter.update({
                name: nameTypeMeter
            }).then(() => {
                //return response.redirect('/admin')
                response.redirect('/createTypeMeter')
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

            Models.TypeMeter.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                return response.redirect('/createTypeMeter')
            }).catch((err) => {
                console.log(err)
            })



        } catch (e) {
            console.log(e)
        }
    }
}



export default new CreateTypeMeterController();