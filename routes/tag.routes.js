module.exports = (app) => {
    const tag = require("../controllers/tag.controller")

    var router = require("express").Router()

    router.post("/", tag.create)
    // router.put("/:id", comments.update)
    router.get("/", tag.findAll)
    router.post("/add_tutorial", tag.addTutorial)
    
    app.use("/api/tag", router)
}