import { viewCard } from '@/utils/slices/kanbanSlice'
import Button from '@nextui-org/react/cjs/button'
import { useEffect, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Label from '../Label'

const Card = ({ boardId, id, title, label, handleEdit, data, shared, provided, snapshot }) => {
	const reduxDispatch = useDispatch()

	const handleEditCard = () => handleEdit(data)

	const handleReadCard = () => reduxDispatch(viewCard({ boardId, cardId: id }))

	const { filters } = useSelector((state) => state.boards)
	const [isVisible, setIsVisible] = useState(true)

	useEffect(() => {
		if (filters.label == label || filters.label === 'null') {
			setIsVisible(true)
		} else {
			setIsVisible(false)
		}
	}, [filters])
	console.log(filters.label, label)

	return shared ? isVisible && (
		<div
			className='rounded-lg bg-slate-50 hover:bg-white duration-300 hover:shadow-lg py-6 px-4 my-2 flex flex-row justify-between items-center text-left cursor-pointer relative overflow-hidden'
			onClick={handleReadCard}
		>
			<div className='pl-12 text-right break-all'>
				<span className='text-sm font-medium text-slate-900'>{title}</span>
			</div>

			<div className='absolute top-1 left-1'>
				<Label label={label} />
			</div>
		</div>
	) : isVisible && (
		<div
			className='rounded-lg bg-slate-50 hover:bg-white duration-300 py-6 px-4 my-2 flex flex-row justify-between items-center text-left cursor- relative overflow-hidden'
			onClick={handleReadCard}
			ref={provided?.innerRef}
			{...provided?.draggableProps}
			{...provided?.dragHandleProps}
		>
			<div className='pl-12 text-right break-all'>
				<span className='text-sm font-medium text-slate-900'>{title}</span>
			</div>

			{!shared && (
				<Button
					light
					color='primary'
					auto
					size='xs'
					onClick={handleEditCard}
					className='!absolute left-2'
				>
					<BiEditAlt className=' text-lg' />
				</Button>
			)}

			<div className='absolute top-1 left-1'>
				<Label label={label} />
			</div>
		</div>
	)
}

export default Card
