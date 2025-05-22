import axiosInstance from './axiosInstance'
import {Login} from "../models/login";

export function signIn(request: Login) {
    return axiosInstance.post('/auth/login', request);
}