module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("tools", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            slug: {
                type: Sequelize.STRING
            },
            link: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deleted_at: {
                type: Sequelize.DATE
            }
        })
    },
    down: queryInterface => {
        return queryInterface.dropTable("tools")
    }
}
