const knex = require("knex")({
    client: "pg",
    connection: {
        host: "locahost",
        user: "postgres",
        password: "654789123",
        database: "mini_insta"
    }
})

module.exports = knex