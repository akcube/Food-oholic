import axios from "axios";
import { badToken } from "./authContext";

export const GetCustomer = async (authContext, cid) => {
    if(badToken(authContext)) return;
    try{
        let res = await axios.get("/customer/", {params: {id: cid}});
        return {success: true, data: res.data};
    }
    catch(e){
        return {success: false};
    }
}

export const FavoriteItem = async (authContext, farr) => {
    if(badToken(authContext)) return;
    try{
        let res = await axios.post("/customer/favorite", {id: authContext.data.user.type_id, favorites: farr});
        return {success: true};
    }
    catch(e){
        return {success: false, message: e.response.data.error};
    }
}