const express = require("express")
const dotenv = require("dotenv")
const helmet = require("helmet")
const cors = require("cors")
const swaggerUi = require("swagger-ui-express")
const route = require("./system/routes")
const swagger = require("./system/swagger.json")

const app = express()
dotenv.config()
app.use(helmet())
app.use(cors())
app.set("trust proxy", true)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger))

app.get("/", (req, res) => {
    res.send("Api v1.0 ")
})

app.use(route)

module.exports = app
