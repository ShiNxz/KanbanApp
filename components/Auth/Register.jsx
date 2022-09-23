import Input from '@/components/UI/Next/Input'
import { FiMail } from 'react-icons/fi'
import { RiLockPasswordLine } from 'react-icons/ri'
import { Spacer } from '@nextui-org/react'
import Reducer, { initialState, ACTIONS } from './Reducer'
import { useReducer } from 'react'
import Button from '@/components/UI/Next/Button'
import { toast } from 'react-toastify'
import cookie from 'js-cookie'
import useAuth from '@/utils/hooks/useAuth'
import Axios from '@/utils/functions/Axios'
import { useRouter } from 'next/router'

const RegisterComponent = () => {
	const [state, dispatch] = useReducer(Reducer, initialState)
	const router = useRouter()

	const { mutate } = useAuth()

	const setUsername = (e) => dispatch({ type: ACTIONS.SET_USERNAME, payload: e.target.value })
	const setPassword = (e) => dispatch({ type: ACTIONS.SET_PASSWORD, payload: e.target.value })

	const submitForm = async () => {
		// checks
		if (state.username.status !== 1 || state.password.status !== 1)
			return toast.error('אחד או יותר מהתיבות אינו תקין', {
				autoClose: 3000,
				closeButton: true,
				closeOnClick: true,
			})

		// Set The Loading State
		dispatch({ type: ACTIONS.SET_LOADING, payload: true })

		// Register
		const { success, error, data } = await Axios('/api/auth/register', state, 'POST')
		if (!success) {
			// Register failed -> get the error and send an error notification
			dispatch({ type: ACTIONS.SET_LOADING, payload: false })

			return toast.error(error, {
				autoClose: 3000,
				closeButton: true,
				closeOnClick: true,
			})
		}

		// Register success -> send a success notification
		toast.success('נרשמת בהצלחה!', {
			autoClose: 3000,
			closeButton: true,
			closeOnClick: true,
		})

		// Set the cookie tokon & mutate the auth stateq
		setTimeout(async () => {
			cookie.set('token', data.token, { expires: 30 })
			await mutate()
			router.push('/')
		}, 1200)
	}

	return (
		<div className='bg-slate-100 p-12 rounded-lg shadow-lg flex flex-col item-center w-96'>
			<h2>הרשמה</h2>

			<Input
				clearable={false}
				id='username'
				bordered
				fullWidth
				value={state.username.value}
				color='primary'
				size='lg'
				placeholder='שם משתמש'
				contentLeft={<FiMail />}
				type='text'
				onChange={setUsername}
				error={state.username?.error || undefined}
				success={state.username?.status === 1 ? 'שם המשתמש תקין' : undefined}
				loading={state.loading || undefined}
				aria-label='שם משתמש'
			/>
			<Spacer y={1} />

			<Input
				clearable={false}
				id='password'
				bordered
				fullWidth
				value={state.password.value}
				color='primary'
				size='lg'
				placeholder='סיסמה'
				contentLeft={<RiLockPasswordLine />}
				type='password'
				onChange={setPassword}
				error={state.password?.error || undefined}
				success={state.password?.status === 1 ? 'הסיסמה תקינה' : undefined}
				loading={state.loading || undefined}
				aria-label='סיסמה'
			/>
			<Spacer y={1} />

			<Button
				fullWidth
				color='primary'
				onClick={submitForm}
				loading={state.loading || undefined}
			>
				הרשם
			</Button>
			<Spacer y={0} />
		</div>
	)
}

export default RegisterComponent
