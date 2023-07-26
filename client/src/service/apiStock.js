import axios from 'axios';

export async function getStockName() {
    const response = await axios({
        method: 'get',
        url: `http://localhost:5000/api/fetchStocksName`,
    });

    return response.data;
}

export async function getStockData(queryData) {

    const response = await axios({
        method: 'post',
        url: `http://localhost:5000/api/fetchStockData`,
        data: queryData
    });

    return response.data;
}