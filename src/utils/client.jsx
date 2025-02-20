import axios from "axios";

const token = localStorage.getItem('token')  ? localStorage.getItem('token') : ""

const client = axios.create({
    baseURL : "http://localhost:8080/",
    headers : {
        Authorization : "Bearer " + token
    }
})

export default client