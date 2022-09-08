import {Sequelize} from "sequelize";

let passwordHome = '';
let passwordJob = ''

const sequelize = new Sequelize('askue','root', passwordJob, {
    dialect: "mysql",
    host: '127.0.0.1',
    port: '3306',
    define: {

    }
});

export default sequelize;