const strToSlug = require("../../utils/strToSlug")

module.exports = (sequelize, DataTypes) => {
    const Tool = sequelize.define(
        "Tool",
        {
            title: DataTypes.STRING,
            slug: DataTypes.STRING,
            link: DataTypes.STRING,
            description: DataTypes.STRING
        },
        {
            tableName: "tools",
            paranoid: true,
            hooks: {
                beforeSave: async tool => {
                    tool.slug = await strToSlug(tool.title)
                }
            }
        }
    )
    Tool.associate = function (models) {
        Tool.hasMany(models.Tag, { foreignKey: "tool_id", as: "tags" })
    }
    return Tool
}
