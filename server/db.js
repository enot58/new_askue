import {Sequelize} from "sequelize";

let passwordHome = '28162342';
let passwordJob = ''

const sequelize = new Sequelize('askue','root', passwordJob, {
    dialect: "mysql",
    host: '127.0.0.1',
    port: '3306',
    define: {

    },
    logging: false
});

export default sequelize;