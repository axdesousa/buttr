module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("tags", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            tool_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "tools", // name of Target model
                    key: "id" // key in Target model that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    down: queryInterface => {
        return queryInterface.dropTable("tags")
    }
}
