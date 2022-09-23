import { unViewCard } from '@/utils/slices/kanbanSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Modal } from '@nextui-org/react'
import NextButton from '@/components/UI/Next/Button'
import useSWR from 'swr'
import fetcher from '@/utils/fetcher'
import DateToFullDate, { UnixToDate } from '@/utils/functions/Date'
import Label from '../Label'

const CardModal = () => {
	const { cardModal } = useSelector((state) => state.kanban)
	const { data } = useSWR(cardModal.open ? `/api/cards?cardId=${cardModal.cardId}` : null, fetcher)
	console.log(data)
	const reduxDispatch = useDispatch()
	const closeModal = () => reduxDispatch(unViewCard())

	return (
		<Modal
			closeButton
			aria-labelledby='modal-title'
			open={cardModal.open}
			onClose={closeModal}
		>
			<Modal.Header className='!text-right !justify-start break-all'>
				<h3>{data ? data.card.title : 'אנא המתן..'}</h3>
			</Modal.Header>
			<Modal.Body className='!text-right'>
				{data && (
					<>
						{data.card.description.length > 0 && (
							<div className='flex flex-col'>
								<div className='flex flex-col'>
									<h4 className='!mb-0'>תיאור:</h4>
									<p>{data.card.description}</p>
								</div>
							</div>
						)}
						<div className='flex flex-col'>
							<span className='font-medium !mb-4 flex flex-row items-center'>
								סטטוס:
								<Label
									label={data.card.label}
									className='!text-xs mr-1'
								/>
							</span>
							<span className='font-medium !mb-0'>
								תאריך התחלה: {DateToFullDate(UnixToDate(data.card.createdAt))}
							</span>
							<span className='font-medium !mb-4'>
								תאריך סיום: {DateToFullDate(new Date(data.card.dueDate))}
							</span>
							<span className='font-medium !mb-0'>
								משתמשים משותפים:
								<p className=''>{data.card.users.map(({ username }) => username).join(', ')}</p>
							</span>
						</div>
					</>
				)}
			</Modal.Body>
			<Modal.Footer>
				<NextButton
					auto
					flat
					onClick={closeModal}
				>
					אישור
				</NextButton>
			</Modal.Footer>
		</Modal>
	)
}

export default CardModal
