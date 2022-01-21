import express from "express"
import bcrypt from "bcrypt"
import User from "../models/user.model.js"
import Customer from "../models/customer.model.js"
import Vendor from "../models/vendor.model.js"
import {ReasonPhrases, StatusCodes} from "http-status-codes"
import Log from "../utils/log.js"

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {

	// Hash password
	let hashed_password;
	try{
		const saltRounds = 10;
		const salt = await bcrypt.genSalt(saltRounds);
		hashed_password = await bcrypt.hash(req.body.password, salt);	
	}
	catch(e){ return res; }

	const user = new User({
		first_name : req.body.first_name,
		last_name : req.body.last_name,
		contact : req.body.contact, 
		email : req.body.email,
		hashed_password : hashed_password,
		user_type : req.body.user_type,
		image : req.body.image
	});


	const userType = (req.body.user_type === 0) 
		? new Customer({
			email : req.body.email,
			age : req.body.age,
			batch_name : req.body.batch_name
		})
		: new Vendor({
			email : req.body.email,
			shop_name : req.body.shop_name,
			business_hours : req.body.business_hours,
		});

	Log.debug(user);
	Log.debug(userType);

	try{ await user.save(); }
	catch(e){ 
		Log.error(e);
		Log.error("USER NO SAVE");
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: ReasonPhrases.INTERNAL_SERVER_ERROR}); 
	}

	try { await userType.save(); }
	catch(e){
		await User.deleteOne({email : req.body.email});
		Log.error("TYPE NO SAVE");
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: ReasonPhrases.INTERNAL_SERVER_ERROR});;
	}
	
	Log.error("WORKS")
	return res.status(StatusCodes.OK).end();
});

export default userRouter