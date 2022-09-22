import { configureStore } from '@reduxjs/toolkit'
import kanbanSlice from '@/slices/kanbanSlice'

export const store = configureStore({
	reducer: {
		kanban: kanbanSlice,
	},
})
