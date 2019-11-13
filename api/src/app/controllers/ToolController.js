const { Tool, Tag, Sequelize } = require("../models")
const TagController = require("./TagController")

class ToolController {
    async index (req, res) {
        if (typeof req.query.search !== "undefined") {
            if (typeof req.query.is_tag !== "undefined") {
                const tools = await TagController.search(req)
                if (tools.length > 0) {
                    return res.status(200).send(tools)
                }
                return res.status(204).send()
            }
            const like = process.env.NODE_ENV === "test" ? Sequelize.Op.like : Sequelize.Op.iLike
            const tools = await Tool.findAll({
                where: {
                    title: {
                        [like]: `%${req.query.search}%`
                    }
                },
                include: ["tags"]
            })
            if (tools.length > 0) {
                return res.status(200).send(tools)
            }

            return res.status(204).send({ query: req.query, body: req.body })
        }
        const tools = await Tool.findAll({
            include: { model: Tag, as: "tags", attributes: ["name"] }
        })

        return res.status(200).send(tools)
    }

    async show (req, res) {
        const { id } = req.params
        const tool = await Tool.findByPk(id, {
            include: { association: "tags" }
        })
        return res.status(200).send(tool)
    }

    async create (req, res) {
        const { tags } = req.body
        const data = await Tool.create(req.body)

        const bulkTags = []
        tags.forEach(tag => {
            bulkTags.push({ name: tag, tool_id: data.id })
        })
        await Tag.bulkCreate(bulkTags)

        const payload = {
            id: data.id,
            title: data.title,
            link: data.link,
            description: data.description,
            tags
        }
        return res.status(201).send(payload)
    }

    async update (req, res) {
        const { id } = req.params
        const { tags } = req.body
        delete req.body.tags

        const bulkTags = []

        await Tag.destroy({ where: { tool_id: id } })

        tags.forEach(tag => {
            bulkTags.push({ name: tag, tool_id: id })
        })
        await Tag.bulkCreate(bulkTags)
        const item = await Tool.findOne({
            where: { id },
            include: ["tags"]
        })
        await item.update(req.body)

        res.status(200).send(item)
    }

    async delete (req, res) {
        const { id } = req.params
        await Tag.destroy({ where: { tool_id: id } })
        const tool = await Tool.findOne({
            where: { id }
        })
        if (tool) {
            await tool.destroy()
        }
        return res.status(204).send()
    }
}
module.exports = new ToolController()
