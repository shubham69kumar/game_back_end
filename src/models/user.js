import { mongoose } from '../config/database.js';

const userSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
			required: true
		},
		sessionId: {
			type: String,
			required: false
		},
		listOfFriends: {
			type: [String],
			default: []
		},
		correctScrore: {
			type: Number,
			default: 0
		},
		incorrectScrore: {
			type: Number,
			default: 0
		}
	},
	{ timestamps: true }
);

export const User = mongoose.model('user', userSchema);