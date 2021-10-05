module.exports = (sequelize, Sequelize) => {
    const Tag = sequelize.define("tag", {
        name: {
            type: Sequelize.STRING
        }
    })

    Tag.associate = db => {
        Tag.belongsToMany(db.tutorials, {
            through: "tutorial_tag",
            as: "tutorials",
            foreignKey: "tag_id"
        })
    }
    
    return Tag
}