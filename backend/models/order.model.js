import mongoose from "mongoose"
import validateInteger from "mongoose-integer"

const orderSchema = new mongoose.Schema({
	customer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Customer'
	},
	food: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Food'
	},
	quantity: { type: Number, required: true, integer: true },
	status: {
		type: String,
		default: 'Placed',
		enum: ['Placed', 'Accepted', 'Cooking', 'Ready for pickup', 'Completed', 'Rejected']
	},
	cost: { type: Number, required: true },
	addons: [{type: String}],
	isRated: { type: Boolean, default: false },
}, { timestamps: true });

orderSchema.plugin(validateInteger);
const Order = mongoose.model('Order', orderSchema);

export default Order;