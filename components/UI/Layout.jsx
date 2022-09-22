import Main from '@/components/UI/Main'
import Head from '@/components/UI/Head'

import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './Navbar'

const Layout = ({ title, children }) => {

	return (
		<>
			<Head title={title} />

			<Navbar />

			<Main>
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
			</Main>
		</>
	)
}

export default Layout
