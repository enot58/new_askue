import {Sequelize} from "sequelize";
import * as dotenv from 'dotenv'
dotenv.config()


export const Meter = {
    up: (queryInterface, Sequelize) => queryInterface.addColumn(
        'meter_number',
        'typeMeterId',
        {
            type: Sequelize.Number,
            allowNull: false
        }
    ),

    down: (queryInterface, Sequelize) => queryInterface.removeColumn(
        'meter_number',
        'typeMeterId'
    )
};