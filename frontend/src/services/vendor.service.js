import axios from "axios";
import { badToken } from "./authContext";

export const GetAllVendors = async (authContext) => {
    if(badToken(authContext)) return;
    try{
        let res = await axios.get("/vendor/");
        return res.data;
    }
    catch(e){
        return {success: false};
    }
}