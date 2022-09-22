import { isStrongPassword, matches } from 'validator'

export const initialState = {
	username: { value: '', status: -1, error: false },
	password: { value: '', status: -1, error: false },
}

export const ACTIONS = {
	SET_USERNAME: 'SET_USERNAME',
	SET_PASSWORD: 'SET_PASSWORD',

	SET_LOADING: 'SET_LOADING',
}

const Reducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.SET_USERNAME: {
			const username = action.payload.trim()

			const checkUsername =
				action.payload.length > 4 && action.payload.length < 15 && matches(username, '^[a-zA-Z0-9_.-]*$')

			return {
				...state,
				username: {
					value: action.payload,
					status: checkUsername ? 1 : 0,
					error: checkUsername ? null : 'שם המשתמש אינו תקין!',
				},
			}
		}

		case ACTIONS.SET_PASSWORD: {
			const password = isStrongPassword(action.payload, {
				minLength: 6,
				maxLength: 24,
				minLowercase: 1,
				minUppercase: 0,
				minNumbers: 1,
				minSymbols: 0,
			})

			return {
				...state,
				password: {
					value: action.payload,
					status: password ? 1 : 0,
					error: password ? null : 'הסיסמה אינה חזקה מספיק!',
				},
			}
		}

		case ACTIONS.SET_LOADING: {
			return {
				...state,
				loading: action.payload,
			}
		}

		default:
			return state
	}
}

export default Reducer
