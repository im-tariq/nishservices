const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'secret',
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.error('Connection failed: ' + err.stack);
        process.exit(1);
    }
    console.log('Connected successfully to MySQL!');

    connection.query('CREATE DATABASE IF NOT EXISTS nishservices', (err) => {
        if (err) console.error(err);
        else console.log('Database nishservices ensured.');
        connection.end();
    });
});
