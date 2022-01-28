import {ReasonPhrases, StatusCodes} from "http-status-codes"
import Log from "../utils/log.js"
import express from "express"
import Customer from "../models/customer.model.js";

const customerRouter = express.Router();

customerRouter.get('/', async (req, res) => {
    if(req.query.id === null || req.query.id === undefined) 
        return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    let query = {id: req.query.id};
    try{
        let docs = await Customer.findById(query.id);
        return res.status(StatusCodes.OK).json(docs);
    }
    catch(e){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }    
});

customerRouter.post('/favorite', async(req, res) => {
	const customer = await Customer.findById(req.body.id);
    Log.debug(req.body.favorites);
	try{
		await Customer.updateOne({email: customer.email}, {favorites: req.body.favorites});
	}
	catch(e) {return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: ReasonPhrases.INTERNAL_SERVER_ERROR})}
	return res.status(StatusCodes.OK).send(ReasonPhrases.OK);
});

export default customerRouter;
