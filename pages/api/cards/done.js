import db from '@/utils/db'
import Board from '@/utils/models/Board'
import Card from '@/utils/models/Card'
import User from '@/utils/models/User'
import { verify } from 'jsonwebtoken'

const handler = async (req, res) => {
	await db()

	const { method } = req

	switch (method) {
		case 'GET': {
			if (!('token' in req.cookies)) return res.status(200).json({ success: false, error: 'error to auth' })

			const decoded = verify(req.cookies.token, process.env.SESSION_SECRET)
			let user = await User.where('userId').equals(decoded.userId)

			if (user.length < 1) return res.status(200).json({ success: false, error: 'failed to auth' }) // If the user is not found, return an error

			user = user[0]

			const cards = await Card.where('done.value').equals(true)

			return res.status(200).json({ success: true, cards })
		}

		// Making new boards
		case 'POST': {
			if (!req.cookies.token) return res.status(200).json({ success: false, error: 'failed to auth' }) // Check if the user is logged in

			let { cardId } = req.body // Get the title from the request body
			if (!cardId) return res.status(200).json({ success: false, error: 'missing data' }) // Check if all the data is there

			let card = await Card.where('_id').equals(cardId)
			if (card.length < 1) return res.status(200).json({ success: false, error: 'card not found' }) // Check if the card exists

			card = card[0]

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

			// remove the card from the board
			let board = await Board.find({ cards: { $all: [cardId] } })
			if (board.length < 1) return res.status(200).json({ success: false, error: 'board not found' }) // Check if the card exists in one of the boards

			board = board[0]
			board.cards = board.cards.filter((card) => card != cardId)
			await board.save()

			user = user[0]

			// edit the card as done
			card.done.value = true
			card.done.date = new Date()
			card.done.user = user._id

			await card.save()

			return res.status(200).json({ success: true })
		}

		default:
			return res.status(401).end()
	}
}

export default handler
