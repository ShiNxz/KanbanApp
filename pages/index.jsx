import Kanban from '@/components/Pages/Main'
import Layout from '@/components/UI/Layout'
import { useRouter } from 'next/router'
import useAuth from '@/utils/hooks/useAuth'
import { useEffect } from 'react'

const Index = () => {
	const router = useRouter()
	const { loggedIn } = useAuth()

	useEffect(() => {
		// Check if the user is logged in, if not, redirect to the login page
		if (!loggedIn) router.push('/login')
	}, [])

	return (
		loggedIn && (
			<Layout title='עמוד ראשי'>
				<Kanban />
			</Layout>
		)
	)
}

export default Index
