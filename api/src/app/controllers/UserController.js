const { User } = require("../models")

class UserController {
    async session (req, res) {
        const { email, password } = req.body

        const user = await User.findOne({ where: { email } })

        if (!user) {
            return res.status(401).json({ message: "user not found" })
        }

        const check = await user.checkPassword(password)
        if (!check) {
            return res.status(401).json({ message: "invalid passowd" })
        }

        return res.json({
            user,
            token: user.generateToken()
        })
    }

    async create (req, res) {
        const { email } = req.body

        const user = await User.findOne({ where: { email } })
        if (user) {
            return res.status(406).send({ message: "email already exists" })
        }

        const data = await User.create({ ...req.body })
        const payload = {
            id: data.id,
            email: data.email,
            name: data.name,
            token: data.generateToken()
        }
        return res.status(201).send(payload)
    }
}
module.exports = new UserController()
