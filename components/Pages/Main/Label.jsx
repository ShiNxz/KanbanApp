import { getLabelProps } from '@/utils/data/Labels'

const Label = ({ label, className }) => {
	const { label: labelText, color: labelColor } = getLabelProps(label)

	return (
		<div className={`p-0.5 px-1 rounded-md text-[0.6rem] w-fit h-fit mr-1 ${labelColor} text-white ${className}`}>
			{labelText}
		</div>
	)
}

export const CustomLabel = ({ label, className }) => {
	return (
		<div className={`p-0.5 px-1 rounded-md text-[0.6rem] w-fit h-fit mr-1 ${label.color} text-white ${className}`}>
			{label.label}
		</div>
	)
}

export default Label
