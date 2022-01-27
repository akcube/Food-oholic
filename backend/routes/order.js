import express from "express"
import {ReasonPhrases, StatusCodes} from "http-status-codes"
import Order from "../models/order.model.js";
import Log from "../utils/log.js";

const orderRouter = express.Router();

orderRouter.post('/add', async(req, res) => {
	
    const order = new Order({
        customer: req.body.customer,
        food: req.body.food,
        quantity: req.body.quantity,
        cost: req.body.cost,
        addons: req.body.addons,
    });

	try{
		await order.save();
	}
	catch(e) {Log.error(e); return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: ReasonPhrases.INTERNAL_SERVER_ERROR})}

	return res.status(StatusCodes.OK).json({success: true});
});

export default orderRouter;