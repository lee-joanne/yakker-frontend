// Code taken from CI's Moments project.
import axios from "axios";

axios.defaults.baseURL = 'https://yakker-backend.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create(); // Other requests
export const axiosRes = axios.create(); //Get requests