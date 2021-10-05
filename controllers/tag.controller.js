const db = require("../models")
const Tag = db.tags
const Tutorial = db.tutorials
const Op = db.Sequelize.Op

exports.create = (req, res) => {
    if(!req.body.name) {
        res.status(400).send({
            message: "Name cant be empty"
        })
        return 
    }

    Tag.create({
        name: req.body.name
    }).then(
        data => res.send(data)
    ).catch(
        err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating tag"
            })
        }
    )
}

exports.findAll = (req, res) => {
    const name = req.query.name
    var condition = name ? {name : {[Op.iLike]: `%${name}%`}} : null
    Tag.findAll({where: condition })
        .then(tags => {
        res.send(tags)
    }).catch(err => {
        res.status(500).send({
            message: "Error"
        })
    })
}

exports.addTutorial = (req, res) => {
    if(!req.body.tagId || !req.body.tutorialId) {
        res.status(400).send({
            message: "Empty body"
        })
        return
    }

    const {tagId, tutorialId} = req.body

    Tag.findByPk(tagId)
        .then(tag => {
            if(tag) {
                Tutorial.findByPk(tutorialId)
                    .then(tutorial => {
                        if(tutorial) {
                            tag.addTutorial(tutorial)
                            res.send({
                                message: "Added Successfully"
                            })
                        }
                        else {
                            res.status(404).send({
                                message: `Cannot find the tutorial with id=${tutorialId}`
                            })
                        }
                    })
            }
            else {
                res.status(404).send({
                    message: `Cannot find tag with id=${tagId}`
                })
            }
        })
}