import useAuth from '@/utils/hooks/useAuth'
import Link from 'next/link'
import NextButton from './Next/Button'

const Navbar = () => {
	const { handleLogout } = useAuth()

	return (
		<div className='bg-slate-100 fixed w-full'>
			<div className='container p-4 flex flex-row justify-between items-center mx-auto'>
				<div>
					<PageLink
						title='עמוד ראשי'
						link='/'
					/>
					<PageLink
						title='ארכיון'
						link='/archive'
					/>
					<PageLink
						title='סטטיסטיקות'
						link='/stats'
					/>
				</div>
				<NextButton
					color='primary'
					size='xs'
					onClick={handleLogout}
				>
					התנתק
				</NextButton>
			</div>
		</div>
	)
}

const PageLink = ({ title, link }) => {
	return (
		<Link href={link}>
			<a className='text-neutral-900 hover:text-blue-500 duration-300 text-lg ml-4'>{title}</a>
		</Link>
	)
}

export default Navbar
