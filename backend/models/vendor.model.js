import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"

const vendorSchema = new mongoose.Schema({
	email : { type: String, required: true, unique: true },
	shop_name: { type: String, required: true },
	business_hours: {
		open: { type: Date, required: true },
		close: { type: Date, required: true }
	}
});

vendorSchema.plugin(uniqueValidator);
const Vendor = mongoose.model('Vendor', vendorSchema);

export default Vendor