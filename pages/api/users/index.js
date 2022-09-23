import db from '@/utils/db'
import User from '@/models/User'

const handler = async (req, res) => {
	await db()

	const { method } = req

	switch (method) {
		// Get a specifc board by user, id, or all
		case 'GET': {
			if (!req.cookies.token) return res.status(200).json({ success: false, error: 'failed to auth' }) // Check if the user is logged in

			let users = await User.find({}).select('userId username')
			if (users.length < 1) return res.status(200).json({ success: false, error: 'users not found' })

			return res.status(200).json({ success: true, users })
		}

		default:
			return res.status(401).end()
	}
}

export default handler
