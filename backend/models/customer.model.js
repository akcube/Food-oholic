import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"

const customerSchema = new mongoose.Schema({
	email : { type: String, required: true, unique: true },
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

export default Customer;