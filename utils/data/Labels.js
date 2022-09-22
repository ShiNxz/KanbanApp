// Labels
const Labels = [
	{
		label: 'דחוף',
		color: 'bg-red-400',
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

export const getLabelProps = (num) => {
	return Labels[num]
}

export default Labels
