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
import DateToFullDate from '@/utils/functions/Date'
import useSWR from 'swr'
import fetcher from '@/utils/fetcher'

const AddCardModal = ({ mutate }) => {
	const { loggedIn, user } = useAuth()
	const { data } = useSWR('/api/users', fetcher)
	const { addCard } = useSelector((state) => state.kanban)
	const [state, dispatch] = useReducer(Reducer, initialState)
	const reduxDispatch = useDispatch()

	const closeModal = () => reduxDispatch(closeCardModal())

	useEffect(() => {
		dispatch({
			type: ACTIONS.RESET_STATE,
			def: addCard.card
				? { ...initialState, ...addCard.card, dueDate: new Date(addCard?.card?.dueDate) }
				: initialState,
		})
	}, [addCard.open])

	const handleAddCard = async () => {
		// Destruct the state needed properties
		const { title, description, label, dueDate, users } = state

		// check if the date is valid
		if (isNaN(state.dueDate))
			return toast.error('יש לבחור תאריך', {
				autoClose: 3000,
				closeButton: true,
				closeOnClick: true,
			})

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

	const handleDone = async () => {
		const { _id } = state
		dispatch({ type: ACTIONS.SET_LOADING, payload: true })
		// Send the request to the server to set the card as done
		const { success, error } = await Axios('/api/cards/done', { cardId: _id }, 'POST')

		if (success) {
			toast.success('המשימה הועברה לארכיון המשימות', {
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
				<Modal.Header>
					<h4>{addCard.card ? 'עריכת משימה' : 'הוספת משימה'}</h4>
				</Modal.Header>
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
								color='secondary'
								disabled={state.loading || undefined}
							>
								שיתוף משתמשים
							</Dropdown.Button>
							<Dropdown.Menu
								aria-label='users'
								onAction={(id) =>
									dispatch({
										type: ACTIONS.ADD_USER,
										payload:
											(data && data.users && data.users.filter((u) => u._id === id)[0]) || null,
									})
								}
							>
								{data &&
									data.users
										.filter(
											({ _id }) =>
												_id !== user._id && state.users.filter((u) => u._id === _id).length < 1
										)
										.map(({ _id, username }) => (
											<Dropdown.Item key={_id}>{username}</Dropdown.Item>
										))}
							</Dropdown.Menu>
						</Dropdown>
						{state.users.length > 0 && (
							<div className='flex flex-col items-center'>
								<span className='font-medium'>משתמשים:</span>
								{state.users.map((u) => (
									<div
										className='flex flex-row items-center'
										key={u._id}
									>
										{u.username}
										{user._id !== u._id && (
											<MdDeleteForever
												className='duration-300 hover:text-blue-500 cursor-pointer mr-2'
												onClick={() => dispatch({ type: ACTIONS.DEL_USER, payload: u._id })}
											/>
										)}
									</div>
								))}
								{state.users.length > 0 && (
									<span className='text-xs mt-2'>המשתמשים יקבלו גישה לצפות במשימה</span>
								)}
							</div>
						)}
					</div>
					<div className='flex flex-col border-r pr-6 mr-4 border-slate-500/20'>
						<span className='font-medium !mb-0'>תאריך סיום (דד-ליין):</span>
						<DayPicker
							mode='single'
							selected={state.dueDate}
							onSelect={(date) => dispatch({ type: ACTIONS.SET_DUE_DATE, payload: date })}
							pagedNavigation
						/>
						<span>התאריך שנבחר: {DateToFullDate(state.dueDate)}</span>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<NextButton
						auto
						flat
						color='error'
						onClick={closeModal}
						loading={state.loading || undefined}
					>
						ביטול
					</NextButton>

					{addCard.card && (
						<NextButton
							auto
							flat
							color='success'
							onClick={handleDone}
							loading={state.loading || undefined}
						>
							סמן משימה כבוצעה
						</NextButton>
					)}

					{addCard.card && (
						<NextButton
							auto
							flat
							color='warning'
							onClick={handleDelete}
							loading={state.loading || undefined}
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
