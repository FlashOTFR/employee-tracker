const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '5eku+aya',
    database: 'employees'
  });
  
  connection.connect(err => {
    if (err) {
      console.error('error connecting', err.stack);
      return;
    }
  
    console.log(`connected with id ${connection.threadId}`);

});

module.exports = connection;