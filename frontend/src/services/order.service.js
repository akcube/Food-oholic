import { badToken } from "./authContext";
import axios from "axios";

export const AddOrder = async (authContext, order) => {
    if(badToken(authContext)) return;
    try{
        await axios.post("order/add", order);
        return {success: true};
    }
    catch(e){
        return {success: false};
    }
}

export const RateOrder = async (authContext, order, rating) => {
    if(badToken(authContext)) return;
    if(order.status !== 'Completed') return {success: false};
    try{
        await axios.post("order/rate", {id: order._id, rating: rating});
        await axios.post("food/rate", {id: order.food, rating: rating});
        return {success: true};
    }
    catch(e){ return {success: false}; }
}

const nxt = {
    'Placed' : 'Accepted',
    'Accepted' : 'Cooking',
    'Cooking' : 'Ready for pickup',
};

export const ProgressOrder = async (authContext, order) => {
    if(badToken(authContext)) return;
    if(order.status === 'Completed' || order.status === 'Rejected') return {success: false};
    try{
        await axios.post("order/update", {id: order._id, status: nxt[order.status], customer: order.customer});
        return {success: true};
    }
    catch(e){ return {success: false}; }
}

export const PickupOrder = async (authContext, order) => {
    if(badToken(authContext)) return;
    console.log(order.status);
    if(order.status !== 'Ready for pickup') return {success: false};
    try{
        await axios.post("order/update", {id: order._id, status: 'Completed'});
        return {success: true};
    }
    catch(e){ return {success: false}; }
}

export const RejectOrder = async (authContext, order) => {
    if(badToken(authContext)) return;
    try{
        await axios.post("order/update", {id: order._id, status: 'Rejected', customer: order.customer});
        return {success: true};
    }
    catch(e){ return {success: false}; }
}

export const GetOrders = async (authContext, order) => {
    if(badToken(authContext)) return;
    try{
        let res = await axios.get("order/", {params: order});
        return {success: true, data: res.data};
    }
    catch(e){
        return {success: false};
    }
}