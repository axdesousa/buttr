module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define(
        "Tag",
        {
            name: DataTypes.STRING
        },
        {
            tableName: "tags"
        }
    )
    Tag.associate = function (model) {
        Tag.belongsTo(model.Tool, { foreignKey: "tool_id", as: "tool" })
    }

    return Tag
}
