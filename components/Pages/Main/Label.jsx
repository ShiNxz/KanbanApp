import { getLabelProps } from '@/utils/data/Labels'

const Label = ({ label, className }) => {
	const { label: labelText, color: labelColor } = getLabelProps(label)

	return (
		<div className={`p-0.5 px-1 rounded-md text-[0.6rem] w-fit h-fit ${labelColor} text-white ${className}`}>{labelText}</div>
	)
}

export default Label
