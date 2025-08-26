/** Base API Axios Client */
import axios from "axios";

// Base Axios API Request Client
const baseClient = axios.create({
    baseURL: "http://localhost:3081",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});


export default baseClient;