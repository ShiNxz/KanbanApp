import { addBoard, openCardModal } from '@/utils/slices/kanbanSlice'
import Board from './Board'
import CardModal from './old'
import useAuth from '@/utils/hooks/useAuth'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import { useDispatch } from 'react-redux'

import AddBoardModal from './Board/AddModal'
import AddCardModal from './Card/AddModal'

const Kanban = () => {
	const { user, mutate } = useAuth()
	const reduxDispatch = useDispatch()

	// Add a new board
	const handleAddBoard = () => reduxDispatch(addBoard())

	return (
		<>
			<div className='flex flex-row'>
				{user.boards.map((board) => (
					<Board
						key={board._id}
						id={board._id}
						title={board.title}
						cards={board.cards}
						mutate={mutate}
					/>
				))}
				<div
					className='rounded-lg bg-slate-200/20 hover:bg-slate-200/50 hover:shadow-md border-4 duration-300 cursor-pointer border-white/50 hover:border-white hover:-translate-y-1 border-dashed shadow-sm p-5 text-center font-medium ml-4 min-h-[30rem] text-3xl flex flex-col justify-center items-center w-60'
					onClick={handleAddBoard}
				>
					<AiOutlinePlusSquare className='text-4xl mb-4' />
					<span>הוסף בלוק חדש</span>
				</div>
			</div>
			<AddBoardModal mutate={mutate} />
			<AddCardModal mutate={mutate} />
			{/* <CardModal /> */}
		</>
	)
}

export default Kanban
