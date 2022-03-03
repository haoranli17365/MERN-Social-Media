import { axiosInstance } from './config';

export const loginCall = async (userCrdential, dispatch) => {
    dispatch({type: "LOGIN_START"});
    try{
        const res = await axiosInstance.post("/api/auths/login", userCrdential);
        dispatch({type: "LOGIN_SUCESS", payload: res.data});
    }catch(err) {
        dispatch({type: "LOGIN_FAIL", payload: err});
    }
}