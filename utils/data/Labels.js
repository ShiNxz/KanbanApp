// Labels
const Labels = [
	{
		label: 'דחוף',
		color: 'bg-orange-400',
	},
	{
		label: 'אפשר לחכות',
		color: 'bg-blue-500',
	},
	{
		label: 'בהמשך',
		color: 'bg-green-500',
	},
]

export const getLabelProps = (num) => Labels[num]

// Auto labels for cards
export const customLabels = {
	dueDateOver: {
		label: 'התאריך לביצוע עבר',
		color: 'bg-red-500',
	},
}

export default Labels
