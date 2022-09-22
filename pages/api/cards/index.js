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
			if (!req.cookies.token) return res.status(200).json({ success: false, error: 'failed to auth' }) // Check if the user is logged in

			let { title, description, label, dueDate, users, boardId, cardId } = req.body // Get the title from the request body

			console.log(req.body)
			if (!title && !description && !label && !dueDate && !users && !boardId)
				return res.status(200).json({ success: false, error: 'missing data' }) // Check if all the data is there

			let board = await Board.where('_id').equals(boardId)

			if (board.length < 1) return res.status(200).json({ success: false, error: 'board not found' }) // Check if the board exists

			board = board[0]

			if (cardId) {
				// edit
				let card = await Card.where('_id').equals(cardId)
				if (card.length < 1) return res.status(200).json({ success: false, error: 'card not found' })
				card = card[0]
				card.title = title
				card.description = description
				card.label = label
				card.dueDate = dueDate
				card.users = users
				await card.save()
			} else {
				// make a new card
				const createdCard = await Card.create({ title, description, label, dueDate, users, boardId }) // Create the card
				board.cards.push(createdCard._id)
				await board.save()
			}

			return res.status(200).json({ success: true })
		}

		// Delete a specific card by id
		case 'DELETE': {
			if (!req.body.cardId) return res.status(200).json({ success: false, error: 'cardId is missing' }) // ID is required
			if (!req.body.boardId) return res.status(200).json({ success: false, error: 'boardId is missing' }) // ID is required
			if (!req.cookies.token) return res.status(200).json({ success: false, error: 'failed to auth' }) // Check if the user is logged in

			let { boardId, cardId } = req.body // Get the id from the request body

			const decoded = verify(req.cookies.token, process.env.SESSION_SECRET)
			let user = await User.where('userId').equals(decoded.userId)

			if (user.length < 1) return res.status(200).json({ success: false, error: 'failed to auth' }) // If the user is not found, return an error
			if (user[0].boards.indexOf(boardId) === -1)
				return res.status(200).json({ success: false, error: 'board not found for this user' }) // If the board is not found, return an error

			let board = await Board.where('_id').equals(boardId)
			if (board.length < 1) return res.status(200).json({ success: false, error: 'board not found' }) // If the board is not found, return an error

			board = board[0]

			let card = await Card.where('_id').equals(cardId).deleteOne()

			board.cards = board.cards.filter((card) => card != cardId)
			await board.save()

			return res.status(200).json({ success: true })
		}
		// Get a specifc board by user, id, or all
		case 'GET': {
		}

		default:
			return res.status(401).end()
	}
}

export default handler