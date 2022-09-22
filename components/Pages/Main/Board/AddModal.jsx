import { closeAddBoard } from '@/utils/slices/kanbanSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Modal } from '@nextui-org/react'
import Input from '@/components/UI/Next/Input'
import NextButton from '@/components/UI/Next/Button'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import useAuth from '@/utils/hooks/useAuth'
import Axios from '@/utils/functions/Axios'

const AddBoardModal = ({ mutate }) => {
	const { loggedIn, user } = useAuth()
	const [title, setTitle] = useState('')
	const [loading, setLoading] = useState(false)

	const { addBoard } = useSelector((state) => state.kanban)

	const reduxDispatch = useDispatch()

	const closeModal = () => reduxDispatch(closeAddBoard())

	useEffect(() => {
		// Reset the form value to an empty string
		setTitle('')
	}, [addBoard.open])

	const handleAddBoard = async () => {
		if(loading) return
		// Check if the title is correct & min lenght
		if (title.length < 3)
			return toast.error('יש לכתוב כותרת תקינה', {
				autoClose: 3000,
				closeButton: true,
				closeOnClick: true,
			})

		setLoading(true)
		// Send the request to the server to create a new board
		const { success, error } = await Axios('/api/boards', { title }, 'POST')

		if (success) {
			toast.success('הבלוק נוסף בהצלחה!', {
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
		setLoading(false)
	}

	return (
		loggedIn && (
			<Modal
				closeButton
				aria-labelledby='modal-title'
				open={addBoard.open}
				onClose={closeModal}
			>
				<Modal.Body className='!text-right'>
					<h4 className='!mb-0'>הוספת בלוק חדש</h4>
					<Input
						clearable={false}
						underlined
						fullWidth
						color='primary'
						size='lg'
						className='my-4'
						placeholder='כותרת'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						loading={loading || undefined}
					/>
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
						onClick={handleAddBoard}
						loading={loading || undefined}
					>
						הוספה
					</NextButton>
				</Modal.Footer>
			</Modal>
		)
	)
}

export default AddBoardModal
