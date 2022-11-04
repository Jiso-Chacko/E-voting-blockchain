import axios from "axios";

const apiUrlLocal = 'http://localhost:5001/api/'

const apiClient = axios.create({
    baseURL: apiUrlLocal,
    timeout: 1000 * 5,
    headers: {
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
    }
});

export default apiClient;