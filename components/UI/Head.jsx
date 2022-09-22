import NextHead from 'next/head'

const Head = ({ title }) => {
	const pageTitle = `Kanban | ${title}`

	return (
		<NextHead>
			<title>{pageTitle}</title>
			<meta charSet='UTF-8' />
		</NextHead>
	)
}

export default Head
