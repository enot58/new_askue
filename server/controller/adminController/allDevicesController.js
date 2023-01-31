import {allDeviceInObjects} from "../helpers/helperDB.js";
import {response} from "express";


class AllDevicesController {

    async getPage (req, res) {
        try {
            const allDevice = await allDeviceInObjects()

            res.render('allDevices', {
                allDevice
            })

        } catch (e) {
            
        }
        
        

    }

}

export default new AllDevicesController();