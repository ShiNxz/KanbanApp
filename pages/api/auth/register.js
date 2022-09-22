import { isStrongPassword } from 'validator'

import { hash } from 'bcrypt'
import { v4 } from 'uuid'
import jwt from 'jsonwebtoken'

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

			if (
				!isStrongPassword(password.value, {
					minLength: 6,
					maxLength: 24,
					minLowercase: 1,
					minUppercase: 0,
					minNumbers: 1,
					minSymbols: 0,
				})
			)
				return res.status(200).json({ success: false, error: 'הסיסמה אינה תקינה' })

			// verify email or username does not exist already
			if ((await User.find({ username })).length > 0)
				return res.status(200).json({ success: false, error: 'שם המשתמש כבר קיים במערכת!' })

			const hashedPass = await hash(password.value, 10)

			const createdUser = await User.create({
				userId: v4(),
				username,
				password: hashedPass,
			})

			const token = jwt.sign(
				{
					userId: createdUser.userId,
					email: createdUser.email,
				},
				process.env.SESSION_SECRET
			)

			return res.status(200).json({ success: true, token })
		}
		default:
			return res.status(401).end()
	}
}

export default handler
