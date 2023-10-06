const knex = require("knex")({
    client: "pg",
    connection: {
        host: "localhost",
        user: "postgres",
        password: "654789123",
        database: "mini_insta"
    }
})

module.exports = knex