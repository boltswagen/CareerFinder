const express = require("express");
const mysql = require("mysql");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "joblist"
});
db.connect((err) => {
    if (err){
        console.log("Error connecting to database.");
    }
    else {
        console.log("Connected");
    }
});

// Sort functionalities
app.get("/sortAlpha", (request, response) => { // Displays from link correctly, arrange to display in table
    let sql = "SELECT * FROM joblistings ORDER BY companyName";

    db.query(sql, (err, result) => {
        if (err)
            response.send("Could not retrieve members from database");
        else
            response.send(result);
    });
});

// Server port
app.listen(5000, () => {
    console.log("Server running on port 5000");
});