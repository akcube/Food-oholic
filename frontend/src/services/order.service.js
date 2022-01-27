import { badToken } from "./authContext";
import axios from "axios";

export const AddOrder = async (authContext, order) => {
    if(badToken(authContext)) return;
    try{
        await axios.post("/order/add", order);
        return {success: true};
    }
    catch(e){
        return {success: false};
    }
}