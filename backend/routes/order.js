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

orderRouter.post('/update', async(req, res) => {
	
    let query = {_id: req.body.id};
    let status = {status: req.body.status};
    Log.debug(query);
    Log.debug(status);

	try{
		await Order.updateOne(query, status);
	}
	catch(e) {Log.error(e); return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: ReasonPhrases.INTERNAL_SERVER_ERROR})}

    Log.debug("Worked!");
	return res.status(StatusCodes.OK).json({success: true});
});

orderRouter.get('/', async (req, res) => {
    if(req.query.customer === undefined && req.query.food === undefined) 
        return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    let query = req.query;
    try{
        let docs = await Order.find(query);
        return res.status(StatusCodes.OK).json(docs);
    }
    catch(e){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }    
});

export default orderRouter;