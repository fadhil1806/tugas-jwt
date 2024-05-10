const mysql = require('mysql2')

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    waitForConnections: false,
    port: 3306,
    connectionLimit: 10,
    queueLimit: 0,
    database: 'authlogin'
})