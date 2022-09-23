import Labels from '@/utils/data/Labels'
import { setFilters } from '@/utils/slices/boardsSlice'
import { Dropdown } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'

const Filters = () => {
	const Dispatch = useDispatch()
	const { filters } = useSelector((state) => state.boards)

	console.log(filters)

	const handleLabel = (label) => Dispatch(setFilters({ label }))

	const handleDays = (days) => Dispatch(setFilters({ days: days == 'null' ? null : days }))

	const days = [7, 14, 30, 60, 90]

	return (
		<div className='w-full bg-slate-50 p-3 px-6 rounded-lg flex flex-row items-center'>
			<span className='font-medium ml-2'>אפשרויות סינון:</span>
			<Dropdown>
				<Dropdown.Button
					flat
					size='sm'
					className='mx-1'
				>
					עדיפות: {Labels[filters.label]?.label || 'הכל'}
				</Dropdown.Button>
				<Dropdown.Menu
					aria-label='pririty levels'
					onAction={handleLabel}
				>
					<Dropdown.Item key={null}>הכל</Dropdown.Item>

					{Labels.map(({ label }, index) => (
						<Dropdown.Item key={index}>{label}</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
			<Dropdown>
				<Dropdown.Button
					flat
					size='sm'
					className='mx-1'
				>
					תאריך סיום: {filters.days ? `${filters.days} ימים` : 'הכל'}
				</Dropdown.Button>
				<Dropdown.Menu
					aria-label='days to end'
					onAction={handleDays}
				>
					<Dropdown.Item key={null}>הכל</Dropdown.Item>

					{days.map((p) => (
						<Dropdown.Item key={p}>{p} ימים</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
		</div>
	)
}

export default Filters
