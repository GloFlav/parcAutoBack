const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./config/.env" });

const employesRoute = require('./routes/employes.routes');
const floatsRoute = require('./routes/floats.routes');
const stocksRoute = require('./routes/stocks.routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});


app.use("/api/employe", employesRoute);
app.use("/api/float", floatsRoute);
app.use("/api/stock", stocksRoute);

app.listen(process.env.PORT, () => {
    console.log(`En ecoute sur le port ${process.env.PORT} ...`);
});