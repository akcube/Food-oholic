import express from "express"
import {ReasonPhrases, StatusCodes} from "http-status-codes"
import Order from "../models/order.model.js";
import Log from "../utils/log.js";
import nodemailer from "nodemailer"
import { server_email, server_password } from "../utils/config.js";
import Customer from "../models/customer.model.js"

const orderRouter = express.Router();

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: server_email,
        pass: server_password,
    },
    tls: {
        rejectUnauthorized: false
    }
});

const mailOptions = (status, email) => {
    return({
        from: server_email,
        to: email,
        subject: "Food'oholic: Order update",
        text: "Your order has been " + status + "."
    });
}

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

    if(req.body.status === 'Accepted' || req.body.status === 'Rejected'){
        let customer = await Customer.findOne({_id: req.body.customer});
        const options = mailOptions(req.body.status.toLowerCase(), customer.email);
        transporter.sendMail(options, function (error, info) {
            if (error) Log.error(error)
            else Log.debug(info)
        })
    }

	try{
		await Order.updateOne(query, status);
	}
	catch(e) {Log.error(e); return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: ReasonPhrases.INTERNAL_SERVER_ERROR})}

	return res.status(StatusCodes.OK).json({success: true});
});

orderRouter.post('/rate', async(req, res) => {
	
    let query = {_id: req.body.id};
    let update = {rating: req.body.rating, isRated: true};

	try{
		await Order.updateOne(query, update);
	}
	catch(e) {Log.error(e); return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: ReasonPhrases.INTERNAL_SERVER_ERROR})}

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