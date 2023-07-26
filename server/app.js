// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require('dotenv').config({ path: "./config.env" });
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");

const { getStockName, getStockData } = require('./controllers/stockControllers');

const app = express();

app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.enable('trust proxy');


app.get('/api/fetchStocksName', getStockName);

app.post('/api/fetchStockData', async (req, res) => {
    // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION

    const { stockName, startDate, endDate } = req.body.values;
    const url = `https://api.polygon.io/v2/aggs/ticker/${stockName}/range/1/day/${startDate}/${endDate}?adjusted=true&sort=asc&limit=120&apiKey=${process.env.API_KEY}`;
    // const url = `https://api.polygon.io/v1/open-close/${stockName}/2023-01-09?adjusted=true&apiKey=eUuG7b7g63l03nCXGW2xAlENA_5sGqU5`
    console.log(url);
    try {
        const response = await axios({
            method: 'get',
            url: url,
        });
        res.status(200).json({
            status: "success",
            data: response.data
        });
    } catch (err) {
        console.log(err.message)
        res.status(400).json({
            status: "Fail",
            error: err.message
        });
    }

});

// app.post('/api/fetchStockData', getStockData);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));