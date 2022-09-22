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

const LoginComponent = () => {
	const [state, dispatch] = useReducer(Reducer, initialState)
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

		// send an api request to check the username & password
		const { success, error, data } = await Axios('/api/auth/login', state, 'POST')

		// failed -> send him an error notification and stop the loading state
		if (!success) {
			dispatch({ type: ACTIONS.SET_LOADING, payload: false })

			return toast.error(error, {
				autoClose: 3000,
				closeButton: true,
				closeOnClick: true,
			})
		}

		// success -> send him a success notification and set the user token cookie
		toast.success('התחברת בהצלחה!', {
			autoClose: 3000,
			closeButton: true,
			closeOnClick: true,
		})

		setTimeout(() => {
			cookie.set('token', data.token, { expires: 30 })
			mutate()
		}, 1200)
	}

	return (
		<div className='bg-slate-100 p-12 rounded-lg shadow-lg flex flex-col item-center w-96'>
			<h2>התחברות</h2>

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
				full
				color='secondary'
				onClick={submitForm}
				loading={state.loading || undefined}
			>
				התחבר
			</Button>
			<Spacer y={0} />
		</div>
	)
}

export default LoginComponent
