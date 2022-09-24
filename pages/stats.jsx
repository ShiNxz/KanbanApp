import Layout from '@/components/UI/Layout'
import Stats from '@/components/Pages/Stats'
import dbConnect from '@/utils/db'
import User from '@/utils/models/User'
import { verify } from 'jsonwebtoken'

const Index = () => {
	return (
		<Layout title='סטטיסטיקות'>
			<Stats />
		</Layout>
	)
}

export async function getServerSideProps({ req, res, params }) {
	await dbConnect()

	if (!('token' in req.cookies))
		return {
			redirect: {
				destination: `/login`,
				permanent: false,
			},
		}

	const decoded = verify(req.cookies.token, process.env.SESSION_SECRET)
	let user = await User.where('userId').equals(decoded.userId)

	if (user.length === 0)
		return {
			redirect: {
				destination: `/login`,
				permanent: false,
			},
		}

	return {
		props: {},
	}
}

export default Index
