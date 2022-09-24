const DateToFullDate = (date) =>
	date instanceof Date && !isNaN(date) ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` : '-'

export const UnixToDate = (unix) => {
	return new Date(unix * 1000)
}

export default DateToFullDate
