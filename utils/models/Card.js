import mongoose, { Schema } from 'mongoose'

const CardSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String },

		label: { type: Number },

		dueDate: { type: Date },

		// shared users
		users: [{ type: Schema.Types.ObjectId, ref: 'User' }],

		createdAt: Number,
		updatedAt: Number,
	},
	{
		collection: 'Cards',
		timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
	}
)

export default mongoose.models.Card || mongoose.model('Card', CardSchema)
