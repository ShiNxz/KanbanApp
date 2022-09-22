import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	cardModal: {
		open: false,
		boardId: null,
		card: null,
	},

	addBoard: {
		open: false,
	},

	addCard: {
		open: false,
		boardId: null,
		card: null, // if defined, edit the card instead of adding a new one
	},
}

export const kanbanSlice = createSlice({
	name: 'kanban',
	initialState,
	reducers: {
		viewCard: (state, action) => {
			const { boardId, cardId } = action.payload
			state.cardModal.open = true
			state.cardModal = { ...state.cardModal, boardId, cardId }
		},
		unViewCard: (state) => {
			state.cardModal.open = false
			state.cardModal.boardId = null
			state.cardModal.cardId = null
		},

		addBoard: (state) => {
			state.addBoard.open = true
		},
		closeAddBoard: (state) => {
			state.addBoard.open = false
		},

		openCardModal: (state, action) => {
			const { boardId, card } = action.payload

			state.addCard.open = true
			state.addCard = { ...state.addCard, boardId, card }
		},
		closeCardModal: (state) => {
			state.addCard.open = false
			state.addCard.boardId = null
		},
	},
})

export const { openCardModal, closeCardModal, viewCard, unViewCard, addBoard, closeAddBoard } = kanbanSlice.actions

export default kanbanSlice.reducer
