import Axios from '@/utils/functions/Axios'
import { openCardModal } from '@/utils/slices/kanbanSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Card from '../Card'
import fetcher from '@/utils/fetcher'
import useAuth from '@/utils/hooks/useAuth'
import useSWR from 'swr'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useEffect, useState } from 'react'

const Board = ({ title, cards, shared, id, mutate, innerRef, provided }) => {
	const { user } = useAuth()

	const [newCards, setNewCards] = useState([])

	useEffect(() => {
		setNewCards(cards)
	}, [cards])

	const { data: sharedCards } = useSWR(shared ? `/api/cards?userId=${user._id}` : null, fetcher)

	if (shared && sharedCards) cards = sharedCards.cards

	const reduxDispatch = useDispatch()

	const handeAddCard = () => reduxDispatch(openCardModal({ boardId: id }))

	const handleEditCard = (cardData) => reduxDispatch(openCardModal({ boardId: id, card: cardData }))

	const handeDeleteBoard = async () => {
		if (shared) return
		if (cards.length > 0)
			return toast.error('לא ניתן למחוק בלוק עם משימות!', {
				autoClose: 3000,
				closeButton: true,
				closeOnClick: true,
			})

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

		await mutate()
	}

	return !shared ? (
		<div
			ref={provided.innerRef}
			{...provided.draggableProps}
			{...provided.dragHandleProps}
		>
			<Droppable droppableId={id}>
				{(provided) => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						<div className='rounded-lg bg-gray-200 shadow-sm text-center p-4 ml-4 w-fit min-w-[17rem] max-w-[20rem] max-h-[50rem]'>
							<span className='text-lg font-medium'>{title}</span>
							<div className='flex flex-col justify-between items-center h-full pb-5'>
								<div className='w-full max-h-[40rem] px-2 overflow-y-auto'>
									{newCards.map((card, index) => (
										<Draggable
											draggableId={card._id}
											index={index}
											key={card._id}
										>
											{(provided, snapshot) => (
												<Card
													key={card._id}
													id={card._id}
													boardId={id}
													title={card.title}
													handleEdit={handleEditCard}
													data={card}
													label={card.label}
													shared={shared}
													index={index}
													provided={provided}
													snapshot={snapshot}
												/>
											)}
										</Draggable>
									))}
								</div>
								{!shared && (
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
								)}
							</div>
						</div>
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	) : (
		<div className='rounded-lg bg-gray-200 shadow-sm text-center p-4 ml-4 min-w-[17rem] max-w-[20rem] h-fit max-h-[50rem]'>
			<span className='text-lg font-medium'>{title}</span>
			<div className='flex flex-col justify-between items-center h-full pb-5'>
				<div className='w-full max-h-[40rem] px-2 overflow-y-auto'>
					{cards.map((card, index) => (
						<Card
							key={card._id}
							id={card._id}
							boardId={id}
							title={card.title}
							handleEdit={handleEditCard}
							data={card}
							label={card.label}
							shared={shared}
							index={index}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default Board
