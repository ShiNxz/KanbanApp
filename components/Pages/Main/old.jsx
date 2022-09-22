import { unViewCard } from '@/utils/slices/kanbanSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Modal } from '@nextui-org/react'
import NextButton from '@/components/UI/Next/Button'
import { useEffect, useState } from 'react'
import useAuth from '@/utils/hooks/useAuth'

const CardModal = () => {
	const { loggedIn } = useAuth()
	const { cardModal } = useSelector((state) => state.kanban)
	const reduxDispatch = useDispatch()
	const closeModal = () => reduxDispatch(unViewCard())
	const [card, setCard] = useState(null)

	useEffect(() => {
		console.log(cardModal)
		if (cardModal.open && cardModal.cardId && cardModal.boardId) {
			// Get the card live information from the api
			setCard(
				boards
					.filter((board) => board.id === cardModal.boardId)[0]
					.cards.filter((card) => card.id === cardModal.cardId)[0]
			)
			console.log(boards)
		}
	}, [cardModal.open])

	return (
		loggedIn &&
		card && (
			<Modal
				closeButton
				aria-labelledby='modal-title'
				open={cardModal.open}
				onClose={closeModal}
			>
				<Modal.Header>
					<h2>{card.title}</h2>
				</Modal.Header>
				<Modal.Body className='!text-right !grid grid-cols-2 gap-4'>
					<div className='flex flex-col'>
						<div className='flex flex-col items-center'>
							<span>משתמשים:</span>
						</div>
					</div>
					<div className='flex flex-col'>
						<span className='font-medium !mb-0'>תאריך סיום (דד-ליין)</span>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<NextButton
						auto
						flat
						color='error'
						onClick={closeModal}
					>
						ביטול
					</NextButton>
					<NextButton
						auto
						//onClick={handleAddCard}
					>
						ערוך פרטים
					</NextButton>
				</Modal.Footer>
			</Modal>
		)
	)
}

export default CardModal
