const mysql = require("mysql");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "PinkPanda",
    database: "SMS"
});

module.exports = db;