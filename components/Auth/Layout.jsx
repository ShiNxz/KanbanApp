import Head from '@/components/UI/Head'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './Navbar'

const AuthLayout = ({ title, children }) => {
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
