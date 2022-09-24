import mongoose, { Schema } from 'mongoose'

const CardSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String },

		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },

		label: { type: Number },

		// until when the card is valid
		dueDate: { type: Date },

		// shared users
		users: [{ type: Schema.Types.ObjectId, ref: 'User' }],

		// done, done by who
		done: {
			value: { type: Boolean, default: false }, // if the work is done
			user: { type: Schema.Types.ObjectId, ref: 'User' }, // who set the card to done
			date: { type: Date }, // when the card was set to done
		},

		createdAt: Number,
		updatedAt: Number,
	},
	{
		collection: 'Cards',
		timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
	}
)

export default mongoose.models.Card || mongoose.model('Card', CardSchema)
