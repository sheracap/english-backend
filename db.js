const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
    process.env.DB_NANE, // db name
    process.env.DB_USER, // user
    process.env.DB_PASSWORD, // pass
    {
        dialect: "postgres",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
);