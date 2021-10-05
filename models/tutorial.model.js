
module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("tutorial", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    })

    Tutorial.associate = db => {
        Tutorial.hasMany(db.comments, {as: "comments"})
        Tutorial.belongsToMany(db.tags, {
            through: "tutorial_tag",
            as: "tags",
            foreignKey: "tutorial_id"
        })
    }

    return Tutorial
}