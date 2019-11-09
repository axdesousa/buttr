const express = require("express")
const authMiddleware = require("../app/middlewares/authMiddleware")
const UserController = require("../app/controllers/UserController")
const ToolController = require("../app/controllers/ToolController")
const TagController = require("../app/controllers/TagController")

const router = express.Router()

router.post("/users", UserController.create)
router.post("/users/session", UserController.session)

router.get("/tools", authMiddleware, ToolController.index)

router.post("/tools", authMiddleware, ToolController.create)
router.get("/tools/:id", authMiddleware, ToolController.show)
router.put("/tools/:id", authMiddleware, ToolController.update)
router.delete("/tools/:id", authMiddleware, ToolController.delete)

router.get("/tags", authMiddleware, TagController.index)

module.exports = router
