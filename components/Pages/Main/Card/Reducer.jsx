
export const initialState = {
	title: '',
	description: '',
	dueDate: new Date(),
	label: 0, 
	users: [],

	loading: false,
}

export const ACTIONS = {
	SET_TITLE: 'SET_TITLE',
	SET_DESCRIPTION: 'SET_DESCRIPTION',
	SET_DUE_DATE: 'SET_DUE_DATE',
	SET_LABEL: 'SET_LABEL',
	ADD_USER: 'ADD_USER',
	DEL_USER: 'DEL_USER',

	SET_LOADING: 'SET_LOADING',

	RESET_STATE: 'RESET_STATE',
}

const Reducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.RESET_STATE: {
			return { ...action.def }
		}

		case ACTIONS.SET_TITLE: {
			return {
				...state,
				title: action.payload,
			}
		}

		case ACTIONS.SET_DESCRIPTION: {
			return {
				...state,
				description: action.payload,
			}
		}

		case ACTIONS.SET_DUE_DATE: {
			return {
				...state,
				dueDate: action.payload,
			}
		}

		case ACTIONS.SET_LABEL: {
			return {
				...state,
				label: action.payload,
			}
		}

		case ACTIONS.ADD_USER: {
			// Check if the user exists
			//if (users.filter(({ id }) => id == action.payload).length < 1) return state
			// Check if the user is already in the list
			if (state.users.filter(({ id }) => id == action.payload).length > 0) return state
			// Get the user object
			const userToAdd = users.filter(({ id }) => id == action.payload)[0]

			state.users.push(userToAdd)
			return { ...state }
		}

		case ACTIONS.DEL_USER: {
			return { ...state, users: state.users.filter(({ id }) => id !== action.payload) }
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
