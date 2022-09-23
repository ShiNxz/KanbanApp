import { configureStore } from '@reduxjs/toolkit'
import kanbanSlice from '@/slices/kanbanSlice'
import boardsSlice from '@/slices/boardsSlice'

export const store = configureStore({
	reducer: {
		kanban: kanbanSlice,
		boards: boardsSlice,
	},
})
