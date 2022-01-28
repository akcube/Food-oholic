import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"

const userSchema = new mongoose.Schema({
	first_name: {type: String, required: true },
	last_name: {type: String, required: true },
	contact: {type: String, required: true, unique: true },
	email: {type: String, required: true, unique: true },
	hashed_password: {type: String, required: true },
	user_type: {type: Number, required: true },
});

userSchema.plugin(uniqueValidator);
const User = mongoose.model('User', userSchema);

export default User;