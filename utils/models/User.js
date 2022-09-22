import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema(
	{
		userId: { type: String, required: true, unique: true },

		// auth
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },

		// user boards
		boards: [{ type: Schema.Types.ObjectId, ref: 'Board' }],

		createdAt: Number,
		updatedAt: Number,
	},
	{
		collection: 'Users',
		timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
	}
)

export default mongoose.models.User || mongoose.model('User', UserSchema)
