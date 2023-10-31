require("dotenv").config();

const express = require("express");
const app = express();

const ejs = require("ejs");




app.use(express.static('public'));

app.use(express.json());

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.get("/home", (req, res) => {
    res.render("home");
});

const routes = require("./routes");


app.use("/api", routes);



module.exports = app;