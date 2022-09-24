const StatCard = ({ title, children }) => {
	return (
		<div className='flex flex-col bg-slate-200 p-4 px-6 rounded-lg'>
			<h4>{title}</h4>
			<div>{children}</div>
		</div>
	)
}

export default StatCard
