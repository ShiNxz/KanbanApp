import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	boards: [],
	filters: { label: 'null', days: 'null' }, // show only priority, on filter Mode enabled, cant move cards
}

export const boardsSlice = createSlice({
	name: 'boards',
	initialState,
	reducers: {
		setBoards: (state, action) => {
			state.boards = action.payload
		},
		reorderBoards: (state, action) => {
			const { destination, source } = action.payload
			const [removed] = state.boards.splice(source.index, 1)
			state.boards.splice(destination.index, 0, removed)
		},
		reorderCards: (state, action) => {
			const { destination, source } = action.payload

			const sourceBoardIndex = state.boards.findIndex((board) => board._id === source.droppableId)
			const destinationBoardIndex = state.boards.findIndex((board) => board._id === destination.droppableId)

			const [removed] = state.boards[sourceBoardIndex].cards.splice(source.index, 1)
			state.boards[destinationBoardIndex].cards.splice(destination.index, 0, removed)
		},

		setFilters: (state, action) => {
			state.filters = { ...state.filters, ...action.payload }
		},
	},
})

export const { setBoards, reorderBoards, reorderCards, setFilters } = boardsSlice.actions

export default boardsSlice.reducer
