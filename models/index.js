const dbConfig = require("../config/db.config")

const Sequelize = require("sequelize")

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.tutorials = require("./tutorial.model")(sequelize, Sequelize)
db.comments = require("./comment.model")(sequelize, Sequelize)
db.tags = require("./tag.model")(sequelize, Sequelize)

Object.keys(db).forEach(key => {
    if('associate' in db[key]) {
        console.log(db[key])
        db[key].associate(db)
    }
})


module.exports = db


