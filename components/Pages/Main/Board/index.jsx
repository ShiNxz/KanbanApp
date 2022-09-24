import Axios from '@/utils/functions/Axios'
import { openCardModal } from '@/utils/slices/kanbanSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Card from '../Card'
import fetcher from '@/utils/fetcher'
import useAuth from '@/utils/hooks/useAuth'
import useSWR from 'swr'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { IoAdd } from 'react-icons/io5'
import { AiOutlineDelete } from 'react-icons/ai'
import DateFilter from '@/utils/functions/DateFilter'

const Board = ({ title, cards, shared, id, mutate, provided }) => {
	const { user, loggedIn } = useAuth()

	const [newCards, setNewCards] = useState([])

	useEffect(() => {
		setNewCards(cards)
	}, [cards])

	const { filters } = useSelector((state) => state.boards)

	useEffect(() => {
		setNewCards(
			cards.filter((card) => {
				if (filters.days !== -1 && !DateFilter(card.dueDate, filters.days)) return null
				if (filters.label !== -1 && card.label !== filters.label) return null
				return card
			})
		)
	}, [filters])

	const { data: sharedCards } = useSWR(
		shared && loggedIn && user._id ? `/api/cards?userId=${user._id}&open=true` : null,
		fetcher
	)

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

	const CardList = styled.div(() => ({
		'width': '100%',
		'overflowY': 'overlay',
		'scrollbarColor': '#fff',
		'::-webkit-scrollbar': {
			width: '5px',
		},
		'::-webkit-scrollbar-track': {
			boxShadow: 'nset 0 0 6px grey',
			borderRadius: '5px',
		},
		'::-webkit-scrollbar-thumb': {
			background: '#fff',
			borderRadius: '15px',
			height: '2px',
		},
		'::-webkit-scrollbar-thumb:hover': {
			background: '#fff',
			maxHeight: '10px',
		},
	}))

	return !shared ? (
		<div
			ref={provided.innerRef}
			{...provided.draggableProps}
			{...provided.dragHandleProps}
		>
			<Droppable
				droppableId={id}
				type='CARDS'
			>
				{(provided) => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						<div className='rounded-lg bg-gray-200 shadow-sm text-center py-4 px-2 ml-4 w-64'>
							<span className='text-lg font-medium pb-2 block'>{title}</span>
							<div className='flex flex-col justify-between items-center h-full'>
								<CardList className='w-full px-1 grid h-full min-h-[4rem] max-h-[30rem]'>
									{newCards.map((card, index) => (
										<Draggable
											draggableId={card._id}
											index={index}
											key={card._id}
											isDragDisabled={filters.days !== -1 || filters.label !== -1}
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
													innerRef={provided.innerRef}
													dueDate={card.dueDate}
												/>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</CardList>
								{!shared && (
									<div className='w-full pt-2 px-2'>
										<div
											className='rounded-lg bg-slate-50/20 hover:bg-slate-50/80 duration-300 border-dashed border-2 border-white p-1.5 px-3 mb-1 text-sm text-center flex justify-center items-center cursor-pointer'
											onClick={() => handeAddCard(id)}
										>
											צור משימה חדשה <IoAdd className='ml-1' />
										</div>
										<div
											className={`rounded-lg bg-red-500/10 hover:bg-red-500/30 duration-300 border-dashed border-2 border-red-500 p-1.5 px-3 text-sm text-center flex justify-center items-center ${
												cards.length > 0 ? 'cursor-not-allowed' : 'cursor-pointer'
											}`}
											onClick={() => handeDeleteBoard(id)}
										>
											{cards.length > 0 ? 'לא ניתן למחוק את הבלוק' : 'מחיקת הבלוק'}
											<AiOutlineDelete className='ml-1' />
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
			<span className='text-lg font-medium block pb-2'>{title}</span>
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
							dueDate={card.dueDate}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default Board
