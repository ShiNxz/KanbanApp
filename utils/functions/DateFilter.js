const DateFilter = (date, days) => {
	// convert the date to a unix timestamp
	const unixTime = parseInt((new Date(date).getTime() / 1000).toFixed(0))
	console.log('unixTime', unixTime, new Date(date))
	// get the current unix timestamp
	const currentUnixTime = parseInt((new Date().getTime() / 1000).toFixed(0))
	console.log('currentUnixTime', currentUnixTime)
	// get the difference between the two timestamps
	const difference = unixTime - currentUnixTime
	if (difference < -(3600 * 24)*2) return true
	// convert the difference to days
	const differenceInDays = Math.floor(difference / (3600 * 24))
	// return true if the difference is less than the number of days
	console.log(Math.abs(differenceInDays), differenceInDays, difference, days, differenceInDays <= days)
	return differenceInDays <= days
}

export default DateFilter
