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
app.get("/sortAlpha", (request, response) => {
    let sql = "SELECT * FROM joblistings ORDER BY companyName";

    db.query(sql, (err, result) => {
        if (err)
            response.status(500).send("Could not retrieve members from database");
        else
            response.json(result);
    });
});
app.get("/sortPlace", (request, response) => {
    let sql = "SELECT * FROM joblistings ORDER BY place";

    db.query(sql, (err, result) => {
        if (err)
            response.status(500).send("Could not retrieve members from database");
        else
            response.json(result);
    });
});
app.get("/sortLocation", (request, response) => {
    let sql = "SELECT * FROM joblistings ORDER BY location";

    db.query(sql, (err, result) => {
        if (err)
            response.status(500).send("Could not retrieve members from database");
        else
            response.json(result);
    });
});
app.get("/sortDate", (request, response) => {
    let sql = "SELECT * FROM joblistings ORDER BY dateAdded";

    db.query(sql, (err, result) => {
        if (err)
            response.status(500).send("Could not retrieve members from database");
        else
            response.json(result);
    });
});
app.get("/sortAction", (request, response) => {
    let sql = "SELECT * FROM joblistings ORDER BY actionStatus";

    db.query(sql, (err, result) => {
        if (err)
            response.status(500).send("Could not retrieve members from database");
        else
            response.json(result);
    });
});
app.get("/sortResponse", (request, response) => {
    let sql = "SELECT * FROM joblistings ORDER BY responseStatus";

    db.query(sql, (err, result) => {
        if (err)
            response.status(500).send("Could not retrieve members from database");
        else
            response.json(result);
    });
});

// Adding a new row
app.post("/addposting", (request, response) => {
    const job = {
        id: request.body.id,
        companyName: request.body.companyName,
        positionName: request.body.positionName,
        place: request.body.place,
        location: request.body.location,
        dateAdded: request.body.dateAdded,
        actionStatus: request.body.actionStatus,
        responseStatus: request.body.responseStatus,
        otherNotes: request.body.otherNotes,
    };

    let sql = "INSERT INTO joblistings SET ?";

    db.query(sql, job, (err, result) => {
        if (err){
            response.send("Could not insert new posting");
        }
        else {
            response.send("New posting has been inserted successfully");
        }
    })
})

// Server port
app.listen(5000, () => {
    console.log("Server running on port 5000");
});