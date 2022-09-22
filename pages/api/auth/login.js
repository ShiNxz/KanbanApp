import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import db from '@/utils/db'
import User from '@/models/User'

const handler = async (req, res) => {
	await db()

	const { method } = req

	switch (method) {
		case 'POST': {
			if (!req.body.username) return res.status(200).json({ success: false, error: 'שם המשתמש חסר' })
			if (!req.body.password) return res.status(200).json({ success: false, error: 'הסיסמה חסרה' })

			let { username, password } = req.body

			username = username.value.trim().toLowerCase()

			const user = await User.findOne({ username })
			if (!user) return res.status(200).json({ success: false, error: 'לא נמצא משתמש קיים עם הפרטים שנרשמו!' })

			const hash = await compare(password.value, user.password)

			if (hash) {
				const token = sign(
					{
						userId: user.userId,
					},
					process.env.SESSION_SECRET
				)

				return res.status(200).json({ success: true, token })
			} else {
				return res.status(200).json({ success: false, error: 'הסיסמה אינה תואמת לשם המשתמש' })
			}
		}
		default:
			return res.status(401).end()
	}
}

export default handler
