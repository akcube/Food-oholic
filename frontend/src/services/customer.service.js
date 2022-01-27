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