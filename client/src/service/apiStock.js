import axios from 'axios';

export async function getStockName() {
    const response = await axios({
        method: 'get',
        url: `http://localhost:5000/api/fetchStocksName`,
    });
    console.log("main", response.data.result);
    return response.data;
}

export async function getStockData(queryData) {

    console.log("api", queryData);
    console.log("huihuihuihuihuihuijujhu")
    const response = await axios({
        method: 'post',
        url: `http://localhost:5000/api/fetchStockData`,
        data: queryData
    });
    console.log("main", response.data);
    return response.data;
}