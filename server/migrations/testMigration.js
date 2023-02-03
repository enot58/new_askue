


module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.addColumn(
        'Users',
        'lastName',
        {
            type: Sequelize.STRING,
            allowNull: false
        }
    ),

    down: (queryInterface, Sequelize) => queryInterface.removeColumn(
        'Users',
        'lastName'
    )
};