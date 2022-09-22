import { closeCardModal } from '@/utils/slices/kanbanSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Textarea, Dropdown } from '@nextui-org/react'
import Input from '@/components/UI/Next/Input'
import NextButton from '@/components/UI/Next/Button'

import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

import Reducer, { ACTIONS, initialState } from './Reducer'
import { useEffect, useReducer } from 'react'
import Labels from '@/utils/data/Labels'

import { MdDeleteForever } from 'react-icons/md'
import { toast } from 'react-toastify'
import useAuth from '@/utils/hooks/useAuth'
import Axios from '@/utils/functions/Axios'

const AddCardModal = ({ mutate }) => {
	const { loggedIn, user } = useAuth()
	const { addCard } = useSelector((state) => state.kanban)
	const [state, dispatch] = useReducer(Reducer, initialState)
	const reduxDispatch = useDispatch()

	const closeModal = () => reduxDispatch(closeCardModal())

	useEffect(() => {
		console.log(addCard.card)
		dispatch({ type: ACTIONS.RESET_STATE, def: addCard.card ? { ...initialState, ...addCard.card } : initialState })
	}, [addCard.open])

	const handleAddCard = async () => {
		// Destruct the state needed properties
		const { title, description, label, dueDate, users } = state

		// Check if the title is correct & min lenght
		if (title.length < 3)
			return toast.error('יש לכתוב כותרת תקינה', {
				autoClose: 3000,
				closeButton: true,
				closeOnClick: true,
			})

		dispatch({ type: ACTIONS.SET_LOADING, payload: true })
		// Send the request to the server to create a new board
		const { success, error } = await Axios(
			'/api/cards',
			{ title, description, label, dueDate, users, boardId: addCard.boardId, cardId: addCard?.card?._id || null },
			'POST'
		)

		if (success) {
			toast.success(addCard.card ? 'המשימה נערכה בהצלחה!' : 'המשימה נוספה בהצלחה!', {
				autoClose: 3000,
				closeButton: true,
				closeOnClick: true,
			})
			mutate()
			closeModal()
		} else
			toast.error(error, {
				autoClose: 3000,
				closeButton: true,
				closeOnClick: true,
			})
		dispatch({ type: ACTIONS.SET_LOADING, payload: false })
	}

	const handleDelete = async () => {
		dispatch({ type: ACTIONS.SET_LOADING, payload: true })
		// Send the request to the server to create a new board
		const { success, error } = await Axios(
			'/api/cards',
			{ boardId: addCard.boardId, cardId: addCard?.card?._id || null },
			'DELETE'
		)

		if (success) {
			toast.success('המשימה נמחקה בהצלחה!', {
				autoClose: 3000,
				closeButton: true,
				closeOnClick: true,
			})
			mutate()
			closeModal()
		} else
			toast.error(error, {
				autoClose: 3000,
				closeButton: true,
				closeOnClick: true,
			})
		dispatch({ type: ACTIONS.SET_LOADING, payload: false })
	}

	return (
		loggedIn && (
			<Modal
				closeButton
				aria-labelledby='modal-title'
				open={addCard.open}
				onClose={closeModal}
				width={700}
			>
				<Modal.Header>{addCard.card ? 'עריכת משימה' : 'הוספת משימה'}</Modal.Header>
				<Modal.Body className='!text-right !grid grid-cols-2 gap-4'>
					<div className='flex flex-col'>
						<Input
							clearable={false}
							underlined
							fullWidth
							color='primary'
							size='lg'
							className='my-4'
							placeholder='כותרת'
							value={state.title}
							onChange={(e) => dispatch({ type: ACTIONS.SET_TITLE, payload: e.target.value })}
							loading={state.loading || undefined}
						/>
						<Textarea
							underlined
							color='primary'
							placeholder='תיאור המשימה'
							rows={5}
							className='my-4'
							value={state.description}
							onChange={(e) => dispatch({ type: ACTIONS.SET_DESCRIPTION, payload: e.target.value })}
							loading={state.loading || undefined}
							disabled={state.loading || undefined}
						/>
						<Dropdown>
							<Dropdown.Button
								flat
								className='my-4'
							>
								עדיפות: {Labels[state.label].label}
							</Dropdown.Button>
							<Dropdown.Menu
								aria-label='pririty levels'
								onAction={(e) => dispatch({ type: ACTIONS.SET_LABEL, payload: e })}
							>
								{Labels.map((p, i) => (
									<Dropdown.Item key={i}>{p.label}</Dropdown.Item>
								))}
							</Dropdown.Menu>
						</Dropdown>

						<Dropdown>
							<Dropdown.Button
								flat
								className='my-4'
								disabled={state.loading || undefined}
							>
								הוספת משתמשים
							</Dropdown.Button>
							<Dropdown.Menu
								aria-label='users'
								onAction={(id) => dispatch({ type: ACTIONS.ADD_USER, payload: id })}
							>
								{/* {users.map(
									({ id, username }) =>
										user.id !== id && <Dropdown.Item key={id}>{username}</Dropdown.Item>
								)} */}
							</Dropdown.Menu>
						</Dropdown>
						<div className='flex flex-col items-center'>
							<span>משתמשים:</span>
							{state.users.map((u) => (
								<div className='flex flex-row items-center'>
									{u.username}
									{user.id !== u.id && (
										<MdDeleteForever
											className='duration-300 hover:text-blue-500 cursor-pointer mr-2'
											onClick={() => dispatch({ type: ACTIONS.DEL_USER, payload: u.id })}
										/>
									)}
								</div>
							))}
						</div>
					</div>
					<div className='flex flex-col'>
						<span className='font-medium !mb-0'>תאריך סיום (דד-ליין)</span>
						<DayPicker
							mode='single'
							selected={state.dueDate}
							onSelect={(date) => dispatch({ type: ACTIONS.SET_DUE_DATE, payload: date })}
							pagedNavigation
						/>
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
					{addCard.card && (
						<NextButton
							auto
							flat
							color='warning'
							onClick={handleDelete}
						>
							מחיקת המשימה
						</NextButton>
					)}
					<NextButton
						auto
						onClick={handleAddCard}
						loading={state.loading || undefined}
					>
						{addCard.card ? 'עריכה' : 'הוספה'}
					</NextButton>
				</Modal.Footer>
			</Modal>
		)
	)
}

export default AddCardModal
