import { addBoard } from '@/utils/slices/kanbanSlice'
import Board from './Board'
import CardModal from './Card/ViewModal'
import useAuth from '@/utils/hooks/useAuth'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import { useDispatch } from 'react-redux'

import AddBoardModal from './Board/AddModal'
import AddCardModal from './Card/AddModal'

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Axios from '@/utils/functions/Axios'
import { useEffect } from 'react'
import { setBoards, reorderBoards, reorderCards } from '@/utils/slices/boardsSlice'
import { useSelector } from 'react-redux'
import Filters from './Filters'

const Kanban = () => {
	const { user, mutate } = useAuth()
	const reduxDispatch = useDispatch()

	// make a client state for the boards & cards
	const { boards, filters } = useSelector((state) => state.boards)

	useEffect(() => {
		reduxDispatch(setBoards(user.boards))
	}, [user.boards])

	// Add a new board
	const handleAddBoard = () => reduxDispatch(addBoard())

	const handleEndDrag = async (result) => {
		const { destination, source, draggableId, type } = result

		if(filters.days !== null || filters.label !== 'null') return

		if (!destination) return

		if (destination.droppableId === source.droppableId && destination.index === source.index) return

		switch (type) {
			// Cards
			case 'DEFAULT': {
				// save the new order in the client
				reduxDispatch(reorderCards(result))

				// save the new order in the server
				Axios('/api/cards', { cardId: draggableId, destination, source }, 'PUT')
			}
			case 'BOARDS': {
				// save the new order in the client
				reduxDispatch(reorderBoards(result))

				// save the new order in the server
				Axios('/api/boards', { destination, source }, 'PUT')
			}
		}
	}

	return (
		<>
			<Filters />
			<DragDropContext onDragEnd={handleEndDrag}>
				<div className='flex flex-row overflow-x-auto pb-12 pt-4'>
					<Droppable
						droppableId='all-droppables'
						direction='horizontal'
						type='BOARDS'
					>
						{(provided) => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
								className='flex flex-row'
								style={{ direction: 'ltr' }}
							>
								{boards.map((board, index) => (
									<Draggable
										draggableId={board._id}
										index={index}
										key={board._id}
									>
										{(provided) => (
											<Board
												id={board._id}
												title={board.title}
												cards={board.cards}
												mutate={mutate}
												index={index}
												provided={provided}
											/>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>

					<Board
						id='shared'
						title='משימות משותפות'
						cards={[]}
						shared
					/>

					<div
						className='rounded-lg bg-slate-200/20 hover:bg-slate-200/50 hover:shadow-md border-4 duration-300 cursor-pointer border-white/50 hover:border-white hover:-translate-y-1 border-dashed shadow-sm p-5 text-center font-medium ml-4 min-h-[30rem] h-fit text-3xl flex flex-col justify-center items-center w-60 '
						onClick={handleAddBoard}
					>
						<AiOutlinePlusSquare className='text-4xl mb-4' />
						<span>הוסף בלוק חדש</span>
					</div>
				</div>
				<AddBoardModal mutate={mutate} />
				<AddCardModal mutate={mutate} />
				<CardModal />
			</DragDropContext>
		</>
	)
}

export default Kanban
