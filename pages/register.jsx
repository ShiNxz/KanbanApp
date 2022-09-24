import AuthLayout from '@/components/Auth/Layout'
import RegisterComponent from '@/components/Auth/Register'
import dbConnect from '@/utils/db'
import User from '@/utils/models/User'
import { verify } from 'jsonwebtoken'

const LoginPage = () => {
	return (
		<AuthLayout title='הרשמה'>
			<RegisterComponent />
		</AuthLayout>
	)
}

export async function getServerSideProps({ req, res, params }) {
	await dbConnect()

	if ('token' in req.cookies) {
		const decoded = verify(req.cookies.token, process.env.SESSION_SECRET)
		let user = await User.where('userId').equals(decoded.userId)

		if (user.length !== 0)
			return {
				redirect: {
					destination: `/`,
					permanent: false,
				},
			}
		else
			return {
				props: {},
			}
	} else
		return {
			props: {},
		}
}
export default LoginPage
