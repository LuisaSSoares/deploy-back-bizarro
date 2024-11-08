const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'bzk3cn7ro6cv7ibhfqsz-mysql.services.clever-cloud.com',
    user: 'us3lwoxhb12m1hiz',
    password: 'J4WfFfl1oS7zJHApuBcC',
    database: 'bzk3cn7ro6cv7ibhfqsz',
});

connection.connect((err) => {
    if(err) {
        throw err;
    } else {
        console.log('Mysql conectado');
    }
});

module.exports = connection;
