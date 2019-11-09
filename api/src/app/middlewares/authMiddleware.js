const jwt = require("jsonwebtoken")
const { promisify } = require("util")

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).send({ message: "token not found" })
    }

    /* eslint no-unused-vars: 0 */
    const [scheme, token] = authHeader.split(" ")

    try {
        const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET)

        res.userId = decoded.id
        return next()
    } catch (err) {
        return res.status(401).send({ message: "invalid token" })
    }
}
