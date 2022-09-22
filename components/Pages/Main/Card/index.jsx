import { getLabelProps } from '@/utils/data/Labels'
import { viewCard } from '@/utils/slices/kanbanSlice'
import { BiEditAlt } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import Label from '../Label'

const Card = ({ boardId, id, title, label, handleEdit, data }) => {
	const reduxDispatch = useDispatch()

	const handleEditCard = () => {
		handleEdit(data)
	}

	const handleReadCard = () => {
		reduxDispatch(viewCard({ boardId, cardId: id }))
	}

	const { label: labelText, color: labelColor } = getLabelProps(label)

	return (
		<div
			className='rounded-lg bg-slate-50 hover:bg-white duration-300 hover:shadow-lg p-6 my-2 flex flex-row justify-between items-center text-left cursor-pointer relative'
			onClick={handleReadCard}
		>
			<div className='flex flex-col'>
				<span className='text-md font-medium text-slate-900'>{title}</span>
			</div>
			<div>
				<BiEditAlt
					onClick={handleEditCard}
					className='hover:text-blue-500 duration-300 cursor-pointer'
				/>
			</div>
			<div className='absolute top-1 left-1'>
				<Label
					label={labelText}
					color={labelColor}
				/>
			</div>
		</div>
	)
}

export default Card
