import mongoose, { Schema } from 'mongoose'

const BoardSchema = new Schema(
	{
		title: { type: String, required: true },
		cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],

		createdAt: Number,
		updatedAt: Number,
	},
	{
		collection: 'Boards',
		timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
	}
)

export default mongoose.models.Board || mongoose.model('Board', BoardSchema)
