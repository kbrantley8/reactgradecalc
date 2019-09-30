var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "kory",
  password: "Password1234",
  database: "gradeCalculator"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});