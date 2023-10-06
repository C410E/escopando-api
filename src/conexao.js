const knex = require("knex")({
    client: "pg",
    connection: {
        host: process.env.HOST_NAME,
        user: process.env.USER_NAME,
        password: process.env.USER_PASS,
        database: process.env.DATA_BASE
    }
})

module.exports = knex