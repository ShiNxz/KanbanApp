import useSWR from 'swr'
import fetcher from '@/utils/fetcher'
import Card from '../Main/Card'

const Archive = () => {
	const { data } = useSWR('/api/cards/done', fetcher)

	console.log(data)
	return (
		<div>
			<h1>ארכיון משימות</h1>
			<div className='grid grid-cols-6 gap-4'>
				{data && data.cards.map((card) => (
					<Card
						id={card._id}
						title={card.title}
						label={card.label}
						data={card}
						dueDate={card.dueDate}
						key={card._id}
						done={card.done}
						boardId='done'
					/>
				))}
			</div>
		</div>
	)
}

export default Archive
