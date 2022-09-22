import Link from 'next/link'

const Navbar = () => {
	return (
		<div className='bg-slate-100 fixed w-full p-4'>
			<PageLink
				title='התחברות'
				link='/login'
			/>
			<PageLink
				title='הרשמה'
				link='/register'
			/>
		</div>
	)
}

const PageLink = ({ title, link }) => {
	return (
		<Link href={link}>
			<a className='text-neutral-900 hover:text-blue-500 duration-300 text-lg ml-2'>
				{title}
			</a>
		</Link>
	)
}

export default Navbar
