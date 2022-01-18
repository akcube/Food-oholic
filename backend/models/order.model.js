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
	isRated: { type: Boolean, default: false },
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

orderSchema.plugin(validateInteger);
const Order = mongoose.model('Order', orderSchema);

export default Order;