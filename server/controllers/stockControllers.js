const axios = require("axios");

const stockNameApi = `https://api.polygon.io/v3/reference/tickers?market=stocks&active=true&order=asc&limit=50&sort=ticker&apiKey=eUuG7b7g63l03nCXGW2xAlENA_5sGqU5`;


exports.getStockName = async (req, res) => {
    const response = await axios({
        method: 'get',
        url: stockNameApi,
    });
    let result = response.data.results.map(data => data.ticker);
    // const data = await response.data;
    res.status(200).json({
        status: "success",
        result
    });
}

// exports.getStockData = async (req, res) => {
//     const url = `https://api.polygon.io/v2/aggs/ticker/${stockName}/range/1/day/${startDate}/${endDate}?adjusted=true&sort=asc&limit=120&apiKey=eUuG7b7g63l03nCXGW2xAlENA_5sGqU5`


// }
