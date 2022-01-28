import express from "express"
import bcrypt from "bcrypt"
import User from "../models/user.model.js"
import Customer from "../models/customer.model.js"
import Vendor from "../models/vendor.model.js"
import {ReasonPhrases, StatusCodes} from "http-status-codes"
import Log from "../utils/log.js"
import jwt from "jsonwebtoken"
import {secret_key} from "../utils/config.js"

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
			business_hours : {
				open : new Date(req.body.open_time),
				close: new Date(req.body.close_time)
			}
		});

	Log.debug(user);
	Log.debug(userType);

	try{ await user.save(); }
	catch(e){ Log.error(e); return res.status(StatusCodes.BAD_REQUEST).json({error: ReasonPhrases.BAD_REQUEST}); }

	// If user saves but type fails remove user as well
	try { await userType.save(); }
	catch(e){
		Log.error(e);
		await User.deleteOne({email : req.body.email});
		return res.status(StatusCodes.BAD_REQUEST).json({error: ReasonPhrases.BAD_REQUEST});
	}
	
	const payload = {
		id: user.id,
		type_id: userType.id,
		email: user.email,
		user_type: user.user_type,
		first_name: user.first_name,
		last_name: user.last_name
	};
	const signedToken = jwt.sign(payload, secret_key, {expiresIn : 7200});
	return res.status(StatusCodes.OK).json({success: true, token: signedToken});
});

userRouter.post('/login', async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	const valid = (user === null) ? false : await bcrypt.compare(req.body.password, user.hashed_password);
	if(!valid){ 
		return res.status(StatusCodes.UNAUTHORIZED).json({error: ReasonPhrases.UNAUTHORIZED, success: false})
	}
	const user_type = (user.user_type === 0)
	? await Customer.findOne({ email: req.body.email })
	: await Vendor.findOne({ email: req.body.email });

	const payload = {
		id: user.id,
		type_id: user_type.id,
		email: user.email,
		user_type: user.user_type,
		first_name: user.first_name,
		last_name: user.last_name
	};

	const signedToken = jwt.sign(payload, secret_key, {expiresIn : 7200});
	return res.status(StatusCodes.OK).json({success: true, token: signedToken});
});

userRouter.post('/walletAdd', async(req, res) => {
	const customer = await Customer.findOne({ email: req.body.email });
	let current_amount = customer.wallet;
	current_amount += req.body.amount;
	try{
		await Customer.updateOne({email: customer.email}, {wallet: current_amount});
	}
	catch(e) {return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: ReasonPhrases.INTERNAL_SERVER_ERROR})}
	return res.status(StatusCodes.OK).json({amount: current_amount});
});

userRouter.post('/walletRefund', async(req, res) => {
	const customer = await Customer.findById(req.body.id);
	let current_amount = customer.wallet;
	current_amount += req.body.amount;
	try{
		await Customer.updateOne({email: customer.email}, {wallet: current_amount});
	}
	catch(e) {return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: ReasonPhrases.INTERNAL_SERVER_ERROR})}
	return res.status(StatusCodes.OK).json({amount: current_amount});
});

export default userRouter