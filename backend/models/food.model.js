import mongoose from "mongoose"
import validateInteger from "mongoose-integer"

const foodSchema = new mongoose.Schema({
	name: { type: String, required: true },
	vendor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Vendor',
		required: true
	},
	image: { type: String },
	price: { type: Number, integer: true, required: true },
	rating: {
		sum_rating: { type: Number, default: 0 },
		num_rated: { type: Number, default: 0 }
	}
	isVeg: { type: Boolean, required: true },
	addons: [{
		addon: { type: String, required: true }
		price: { type: Number, integer: true, required: true }
	}],
	tags: [{ type: String }]
});

foodSchema.plugin(validateInteger);
const Food = mongoose.model('Food', foodSchema);

export default Food;