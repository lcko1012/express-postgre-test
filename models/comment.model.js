
module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
        name: {
            type: Sequelize.STRING
        },
        text: {
            type: Sequelize.STRING
        }
    })

    Comment.associate = db => {
        Comment.belongsTo(db.tutorials, {
            foreignKey: "tutorialId",
            as: "tutorial"
        })
    }

    return Comment
}