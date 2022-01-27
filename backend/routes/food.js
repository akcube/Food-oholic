import {ReasonPhrases, StatusCodes} from "http-status-codes"
import Log from "../utils/log.js"
import express from "express"
import Food from "../models/food.model.js";

const foodRouter = express.Router();

foodRouter.post('/add', async (req, res) => {

	const food = new Food({
		name: req.body.name,
        vendor: req.body.vendor,
        image: req.body.image,
        price: req.body.price,
        isVeg: req.body.isVeg,  
        addons: req.body.addons,
        tags: req.body.tags,
	});

    let checkExists = await Food.findOne({name: req.body.name});
    if(checkExists !== null) return res.status(StatusCodes.BAD_REQUEST).json({error: ReasonPhrases.BAD_REQUEST});

	try{ await food.save(); }
	catch(e){ Log.error(e); return res.status(StatusCodes.BAD_REQUEST).json({error: ReasonPhrases.BAD_REQUEST}); }

	return res.status(StatusCodes.OK).send(ReasonPhrases.OK);
});

foodRouter.post('/delete', async (req, res) => {
    let checkExists = await Food.findOne({name: req.body.name});
    if(checkExists === null) return res.status(StatusCodes.BAD_REQUEST).json({error: ReasonPhrases.BAD_REQUEST});

	try{ await Food.deleteOne({vendor: req.body.vendor, name: req.body.name}); }
	catch(e){ Log.error(e); return res.status(StatusCodes.BAD_REQUEST).json({error: ReasonPhrases.BAD_REQUEST}); }

	return res.status(StatusCodes.OK).send(ReasonPhrases.OK);
});

foodRouter.post('/update', async (req, res) => {
    let checkExists = await Food.findOne({name: req.body.name});
    if(checkExists === null) return res.status(StatusCodes.BAD_REQUEST).json({error: ReasonPhrases.BAD_REQUEST});

    let query = {vendor: req.body.vendor, name: req.body.name};
	try{ await Food.findOneAndUpdate(query, req.body); }
	catch(e){ Log.error(e); return res.status(StatusCodes.BAD_REQUEST).json({error: ReasonPhrases.BAD_REQUEST}); }

	return res.status(StatusCodes.OK).send(ReasonPhrases.OK);
});

foodRouter.get('/', async (req, res) => {
    let query = (req.query.vendor === undefined) ? {} : {vendor: req.query.vendor};
    try{
        let docs = await Food.find(query);
        return res.status(StatusCodes.OK).json(docs);
    }
    catch(e){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }    
});

export default foodRouter;