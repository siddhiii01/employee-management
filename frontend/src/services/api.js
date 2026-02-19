import axios from "axios";

//creating axios instance
export const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});
console.log("Axios baseURL:", import.meta.env.VITE_API_URL);

//request interceptor -> runs before sending any request to backend
API.interceptors.request.use((req) => {
    console.log('req: ', req)
    const token = localStorage.getItem('token');
    if(token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export const loginUser = (data) => API.post('/auth/login', data);
export const createEmployee = (data) => API.post('/employees', data);
export const getEmployees = (params) => API.get('/employees', {params});

