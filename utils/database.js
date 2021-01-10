const mysql = require('mysql2')

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "store",
    password: "9926551180"
})

module.exports = pool.promise();