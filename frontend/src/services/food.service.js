import axios from "axios";
import { badToken } from "./authContext";

export const AddProduct = async (authContext, food) => {
    if(badToken(authContext)) return;
    try{
        await axios.post("food/add", food);
        return {success: true};
    }
    catch(e){
        return {success: false};
    }
}

export const DeleteProduct = async (authContext, food) => {
    if(badToken(authContext)) return;
    try{
        await axios.post("food/delete", food);
        return {success: true};
    }
    catch(e){
        return {success: false};
    }
}

export const UpdateProduct = async (authContext, food) => {
    if(badToken(authContext)) return;
    try{
        await axios.post("food/update", food);
        return {success: true};
    }
    catch(e){
        return {success: false};
    }
}

export const GetAllProducts = async (authContext) => {
    if(badToken(authContext)) return;
    try{
        let res = await axios.get("food/");
        return res.data;
    }
    catch(e){
        return {success: false};
    }
}

export const GetProductsByVendor = async (authContext, vendor) => {
    if(badToken(authContext)) return;
    try{
        let res = await axios.get("food/", {params: {vendor: vendor}});
        return res.data;
    }
    catch(e){
        return {success: false};
    }
}