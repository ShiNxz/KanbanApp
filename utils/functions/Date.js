const DateToFullDate = (date) =>
	typeof date === 'object' ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` : '-'

export const UnixToDate = (unix) => {
	return new Date(unix * 1000)
}

export default DateToFullDate
