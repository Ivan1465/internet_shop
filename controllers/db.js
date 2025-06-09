const mysql = require('mysql2');

 const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', // replace with your MySQL root password
    database: 'internet_shop' // replace with your actual database name
});

// Connect and check
db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err.stack);
        return;
    }
    console.log('✅ Connected to MySQL database as ID', db.threadId);
});

module.exports = db;
