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

export default customerRouter;
