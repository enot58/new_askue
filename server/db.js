import {Sequelize} from "sequelize";
import * as dotenv from 'dotenv' 
dotenv.config()



const sequelize = new Sequelize(process.env.NAME_DB,'root', process.env.PASSWORD_DB, {
    dialect: "mysql",
    host: '127.0.0.1',
    port: '3306',
    define: {

    },
    logging: false
});


export default sequelize;