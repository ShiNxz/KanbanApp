import { customLabels } from '@/utils/data/Labels'
import DateFilter from '@/utils/functions/DateFilter'
import { viewCard } from '@/utils/slices/kanbanSlice'
import Button from '@nextui-org/react/button'
import { BiEditAlt } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import Label, { CustomLabel } from '../Label'

const Card = ({ boardId, id, title, label, handleEdit, data, shared, provided, innerRef, dueDate, done }) => {
	const reduxDispatch = useDispatch()

	const handleEditCard = () => handleEdit(data)

	const handleReadCard = () => reduxDispatch(viewCard({ boardId, cardId: id }))

	return shared || done ? (
		<div
			className='rounded-lg bg-slate-50 hover:bg-white duration-300 hover:shadow-lg py-6 px-4 min-h-[4rem] mx-1 flex flex-row justify-between items-center text-left cursor-pointer relative overflow-hidden'
			onClick={handleReadCard}
		>
			<div className='pl-12 text-right break-all'>
				<span className='text-sm font-medium text-slate-900'>{title}</span>
			</div>

			<div className='absolute top-1 left-1'>
				<Label label={label} />
			</div>
		</div>
	) : (
		<div
			className='rounded-lg bg-slate-50 hover:bg-white duration-300 py-6 px-4 mx-1 mb-2 min-h-[4rem] flex flex-row justify-between items-center text-left cursor-pointer relative overflow-hidden'
			onClick={handleReadCard}
			ref={innerRef}
			{...provided.draggableProps}
			{...provided.dragHandleProps}
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

			<div className='absolute top-1 left-1 flex flex-row'>
				<Label label={label} />
				{DateFilter(dueDate, -2) && <CustomLabel label={customLabels.dueDateOver} />}
			</div>
		</div>
	)
}

export default Card
