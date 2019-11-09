const { Tool, Tag, Sequelize } = require("../models")

class TagController {
    async index(req, res) {
        const tags = await Tag.findAll({ include: ["tool"] })
        if (tags) {
            return res.status(200).send(tags)
        }
        return res.status(204).send()
    }

    async search(req) {
        const like = process.env.NODE_ENV === "test" ? Sequelize.Op.like : Sequelize.Op.iLike
        const idTools = []
        const tags = await Tag.findAll({
            where: {
                name: {
                    [like]: `%${req.query.search}%`
                }
            }
        })
        tags.forEach(t => {
            idTools.push(t.tool_id)
        })

        const tools = await Tool.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: idTools
                }
            },
            include: ["tags"]
        })
        return tools
    }
}
module.exports = new TagController()
