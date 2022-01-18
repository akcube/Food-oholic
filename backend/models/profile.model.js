import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"

const customerSchema = new mongoose.Schema({
	email : { type: String, required: true, unique: true }
	age : { type: Number, required: true },
	batch_name : { 
		type: String, required: true,
		enum: ['UG1', 'UG2', 'UG3', 'UG4', 'UG5']
	},
	wallet : { type: Number, default: 0 },
	favorites : [{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Food'
	}]
});

customerSchema.plugin(uniqueValidator);
const Customer = mongoose.model('Customer', customerSchema);

const vendorSchema = new mongoose.Schema({
	email : { type: String, required: true, unique: true }
	shop_name: { type: String, required: true },
	business_hours: {
		open: { type: Date, required: true },
		close: { type: Date, required: true }
	}
});

vendorSchema.plugin(uniqueValidator);
const Vendor = mongoose.model('Vendor', vendorSchema);

export default {Customer, Vendor};