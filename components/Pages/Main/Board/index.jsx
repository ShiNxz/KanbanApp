import Axios from '@/utils/functions/Axios'
import { openCardModal } from '@/utils/slices/kanbanSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Card from '../Card'

const Board = ({ title, cards, id, mutate }) => {
	const reduxDispatch = useDispatch()

	const handeAddCard = () => reduxDispatch(openCardModal({ boardId: id }))

	const handleEditCard = (cardData) => reduxDispatch(openCardModal({ boardId: id, card: cardData }))

	const handeDeleteBoard = async () => {
		if (cards.length > 0)
			return toast.error('לא ניתן למחוק בלוק עם משימות!', {
				autoClose: 3000,
				closeButton: true,
				closeOnClick: true,
			})

		console.log(id)
		const { success, error } = await Axios('/api/boards', { id }, 'DELETE')
		if (success)
			toast.success('הבלוק נמחק בהצלחה!', {
				autoClose: 3000,
				closeButton: true,
				closeOnClick: true,
			})
		else
			toast.error(error, {
				autoClose: 3000,
				closeButton: true,
				closeOnClick: true,
			})

		mutate()
	}

	return (
		<div className='rounded-lg bg-gray-200 shadow-sm p-4 ml-4 w-60'>
			<span className='text-lg font-medium'>{title}</span>
			<div className='flex flex-col justify-between items-center h-full pb-5'>
				<div className='w-full'>
					{cards.map((card) => (
						<Card
							key={card._id}
							id={card._id}
							boardId={id}
							title={card.title}
							handleEdit={handleEditCard}
							data={card}
							label={card.label}
						/>
					))}
				</div>
				<div className='w-full'>
					<div
						className='rounded-lg bg-slate-50/20 hover:bg-slate-50/50 duration-300 border-dashed border-2 border-white p-1.5 px-3 my-2 text-center flex justify-center items-center cursor-pointer'
						onClick={() => handeAddCard(id)}
					>
						צור משימה חדשה
					</div>
					<div
						className={`rounded-lg bg-red-500/10 hover:bg-red-500/30 duration-300 border-dashed border-2 border-red-500 p-1.5 px-3 my-2 text-center flex justify-center items-center ${
							cards.length > 0 ? 'cursor-not-allowed' : 'cursor-pointer'
						}`}
						onClick={() => handeDeleteBoard(id)}
					>
						{cards.length > 0 ? 'לא ניתן למחוק את הבלוק' : 'מחיקת הבלוק'}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Board
