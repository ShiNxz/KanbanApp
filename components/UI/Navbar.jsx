import useAuth from '@/utils/hooks/useAuth'
import Link from 'next/link'
import NextButton from './Next/Button'

const Navbar = () => {
	const { handleLogout } = useAuth()

	return (
		<div className='bg-slate-100 fixed w-full p-4 flex flex-row justify-between items-center'>
			<PageLink
				title='עמוד ראשי'
				link='/'
			/>
			<NextButton
				color='primary'
				size='xs'
				onClick={handleLogout}
			>
				התנתק
			</NextButton>
		</div>
	)
}

const PageLink = ({ title, link }) => {
	return (
		<Link href={link}>
			<a className='text-neutral-900 hover:text-blue-500 duration-300 text-lg ml-2'>{title}</a>
		</Link>
	)
}

export default Navbar
