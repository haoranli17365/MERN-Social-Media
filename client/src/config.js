import axios from 'axios';


export const axiosInstance = axios.create({
    baseURL : "https://mern-feetbook.herokuapp.com/"
})