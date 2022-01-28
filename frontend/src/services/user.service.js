import axios from "axios"
import { badToken } from "./authContext";

const RegisterUser = async (user, authContext) => {
    let User;
    try{
        let res = await axios.post("/user/register", user);
        localStorage.setItem("jwt", res.data.token);
        axios.defaults.headers.common["Authorization"] = res.data.token;
        User = {success: res.data.success, token: res.data.token};
    }
    catch(e){
        User = {success: false, user: {}};
    }
    authContext.login(User);
}


export const UpdateUser = async (authContext, user) => {
    if(badToken(authContext)) return;
    try{
        let res = await axios.post("/user/update", user);
        return {success: true};
    }
    catch(e){
        return {success: false, message: e.response.data.error};
    }
}

export const GetUser = async (authContext) => {
    if(badToken(authContext)) return;
    try{
        let res = await axios.get("/user/", {params: {id: authContext.data.user.id}});
        return {success: true, data: res.data};
    }
    catch(e){
        return {success: false};
    }
}

const AddToWallet = async (authContext, amt) => {
    if(badToken(authContext)) return;
    try{
        let res = await axios.post("/user/walletAdd", {email: authContext.data.user.email, amount: amt});
        return {success: true, amount: res.data.amount};
    }
    catch(e){
        return {success: false, message: e.response.data.error};
    }
}

const RefundWallet = async (authContext, amt, customerid) => {
    if(badToken(authContext)) return;
    try{
        let res = await axios.post("/user/walletRefund", {id: customerid, amount: amt});
        return {success: true};
    }
    catch(e){
        return {success: false, message: e.response.data.error};
    }
}

export const registerUser = RegisterUser
export const addToWallet = AddToWallet
export const refundWallet = RefundWallet;