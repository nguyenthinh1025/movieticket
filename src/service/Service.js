import axios from "axios";


export const http = axios.create({
    baseURL: 'https://movienew.cybersoft.edu.vn/api',
    timeout: 3000
})


http.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        ['Authorization']: `Bearer ${localStorage.getItem("USER_TOKEN")}`,
        ['TokenCybersoft']: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgMjQiLCJIZXRIYW5TdHJpbmciOiIwOC8wNC8yMDIzIiwiSGV0SGFuVGltZSI6IjE2ODA5MTIwMDAwMDAiLCJuYmYiOjE2NjQyMTE2MDAsImV4cCI6MTY4MTA1OTYwMH0.HQfkAVQ_C4qH8T3vLwdtQfqQMRnagp260JXmrMN5lVs",

    }
    return config;
}, (error) => {
    return Promise.reject(error)
})