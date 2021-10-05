const db = require("../models")
const Comment = db.comments
const Op = db.Sequelize.Op

exports.create = (req, res) => {
    const tutorialId = req.params.tutorialId
    const {name, text} = req.body
    console.log(name)
    return Comment.create({
      name: name,
      text: text,
      tutorialId: tutorialId,
    })
      .then((comment) => {
        res.send(comment)
      })
      .catch((err) => {
        res.status(500).send({
            message: ">> Error while creating comment: ", err
        })
      });
};

exports.update = (req, res) => {
    const id = req.params.id
    
    Comment.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "Comment was updated succesfully"
                })
            }
            else {
                res.send({
                    message: `Cannot update Comment with id=${id}. Maybe Comment was not found`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Comment with id=" + id
            })
        })
}
