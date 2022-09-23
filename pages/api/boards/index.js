import { verify } from 'jsonwebtoken'

import db from '@/utils/db'
import User from '@/models/User'
import Board from '@/utils/models/Board'
import Card from '@/utils/models/Card'

const handler = async (req, res) => {
	await db()

	const { method } = req

	switch (method) {
		// Making new boards
		case 'POST': {
			if (!req.body.title) return res.status(200).json({ success: false, error: 'כותרת חסרה' }) // Title is required
			if (!req.cookies.token) return res.status(200).json({ success: false, error: 'failed to auth' }) // Check if the user is logged in

			let { title } = req.body // Get the title from the request body

			const decoded = verify(req.cookies.token, process.env.SESSION_SECRET)
			let user = await User.where('userId').equals(decoded.userId)

			if (user.length < 1) return res.status(200).json({ success: false, error: 'failed to auth' }) // If the user is not found, return an error

			const createdBoard = await Board.create({ title }) // Create the board

			user[0].boards.splice(0, 0, createdBoard._id) // Add the board to the user boards array
			user[0].save() // Save the user

			return res.status(200).json({ success: true })
		}

		// Delete a specific board by id
		case 'DELETE': {
			if (!req.body.id) return res.status(200).json({ success: false, error: 'id is missing' }) // ID is required
			if (!req.cookies.token) return res.status(200).json({ success: false, error: 'failed to auth' }) // Check if the user is logged in

			let { id } = req.body // Get the id from the request body

			const decoded = verify(req.cookies.token, process.env.SESSION_SECRET)
			let user = await User.where('userId').equals(decoded.userId)

			if (user.length < 1) return res.status(200).json({ success: false, error: 'failed to auth' }) // If the user is not found, return an error
			if (user[0].boards.indexOf(id) === -1)
				return res.status(200).json({ success: false, error: 'board not found' }) // If the board is not found, return an error

			await Board.where('_id').equals(id).deleteOne() // Remove the board

			user[0].boards = user[0].boards.filter((b) => b != id) // Remove board from the user boards array
			user[0].save() // Save the user

			return res.status(200).json({ success: true })
		}

		// Get a specifc board by user, id, or all
		case 'GET': {
			if (!req.cookies.token) return res.status(200).json({ success: false, error: 'failed to auth' }) // Check if the user is logged in

			const decoded = verify(req.cookies.token, process.env.SESSION_SECRET)
			let user = await User.where('userId')
				.equals(decoded.userId)
				.populate('boards')
				.populate({
					path: 'boards',
					populate: {
						path: 'cards',
					},
				})
			if (user.length < 1) return res.status(200).json({ success: false, error: 'failed to auth' }) // If the user is not found, return an error

			return res.status(200).json({ success: true, boards: user[0].boards })
		}

		// Reorder the boards
		case 'PUT': {
			if (!req.cookies.token) return res.status(200).json({ success: false, error: 'failed to auth' }) // Check if the user is logged in
			const { destination, source } = req.body

			const decoded = verify(req.cookies.token, process.env.SESSION_SECRET)
			let user = await User.where('userId')
				.equals(decoded.userId)
				.populate('boards')
				.populate({
					path: 'boards',
					populate: {
						path: 'cards',
					},
				})

			if(user.length < 1) return res.status(200).json({ success: false, error: 'failed to auth' }) // If the user is not found, return an error

			user = user[0]

			console.log(req.body)

			const [removed] = user.boards.splice(source.index, 1)
			user.boards.splice(destination.index, 0, removed)

			user.save()

			return res.status(200).json({ success: true })
		}

		default:
			return res.status(401).end()
	}
}

export default handler
