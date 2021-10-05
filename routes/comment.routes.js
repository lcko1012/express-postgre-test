module.exports = (app) => {
    const comments = require("../controllers/comment.controller")

    var router = require("express").Router()

    router.post("/tutorial/:tutorialId", comments.create)
    router.put("/:id", comments.update)
    
    app.use("/api/comments", router)
}