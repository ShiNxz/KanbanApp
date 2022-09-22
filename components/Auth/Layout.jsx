import { useRouter } from 'next/router'

import Head from '@/components/UI/Head'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './Navbar'
import useAuth from '@/utils/hooks/useAuth'
import { useEffect } from 'react'

const AuthLayout = ({ title, children }) => {
	const router = useRouter()
	const { loggedIn } = useAuth()

	useEffect(() => {
		// Check if the user is already logged in, if so, redirect to the home page
		if (loggedIn) router.push('/')
	}, [])

	return (
		<>
			<Head title={title} />

			<Navbar />

			<div className='bg-slate-300 min-h-screen flex flex-col justify-center items-center'>
				<AnimatePresence>
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						//exit={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.3 }}
						key={title}
					>
						{children}
					</motion.div>
				</AnimatePresence>
			</div>
		</>
	)
}

export default AuthLayout
