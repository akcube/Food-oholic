import {ReasonPhrases, StatusCodes} from "http-status-codes"
import Log from "../utils/log.js"
import express from "express"
import Vendor from "../models/vendor.model.js";

const vendorRouter = express.Router();

vendorRouter.get('/', async (req, res) => {
    let query = (req.query.id === undefined) ? {} : {id: req.query.id};
    try{
        let docs = await Vendor.find(query);
        return res.status(StatusCodes.OK).json(docs);
    }
    catch(e){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }    
});

export default vendorRouter;
