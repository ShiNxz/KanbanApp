Date.prototype.toUnixTime = function() {
    return this.getTime()/1000|0
}

Date.time = function() {
    return new Date().toUnixTime()
}

export const getTime = (Identifier) => {
	// 1 = Time H:M:S
	// 2 = Time H:M
	// 3 = Date D/M/Y
	// 4 = Date D/M
	// 5 = Time+Date D/M/Y • H:M:S
	let currentdate = new Date()
	let seconds = (currentdate.getSeconds() < 10 ? '0' : '') + currentdate.getSeconds()
	let minutes = (currentdate.getMinutes() < 10 ? '0' : '') + currentdate.getMinutes()
	let hours = (currentdate.getHours() < 10 ? '0' : '') + currentdate.getHours()
	let days = (currentdate.getDate() < 10 ? '0' : '') + currentdate.getDate()
	let month = (currentdate.getMonth() + 1 < 10 ? '0' : '') + (currentdate.getMonth() + 1)

	if ((Identifier = 1)) return `${hours}:${minutes}:${seconds}`

	if ((Identifier = 2)) return `${hours}:${minutes}`

	if ((Identifier = 3)) return `${days}/${month}/${currentdate.getFullYear()}`

	if ((Identifier = 4)) return `${days}/${month}`

	if ((Identifier = 5))
		return days + '/' + month + '/' + currentdate.getFullYear() + ' • ' + hours + ':' + minutes + ':' + seconds

	return false
}

export const timeSince = (timeStamp, hebrew = false) => {

	const secondsPast = (Date.time() - timeStamp)

	if (secondsPast < 60) {
		return parseInt(secondsPast) + `${hebrew ? ' שניות' : ' s'}`
	}
	if (secondsPast < 3600) {
		return parseInt(secondsPast / 60) + `${hebrew ? ' דקות' : ' min'}`
	}
	if (secondsPast <= 86400) {
		return parseInt(secondsPast / 3600) + `${hebrew ? ' שעות' : ' hours'}`
	}

	else {
		return parseInt(secondsPast / 86400) + `${hebrew ? ' ימים' : ' days'}`
	}
}

export const relativeTime = (timeStamp, hebrew = false) => {

	const secondsPast = (timeStamp - Date.time())

	if (secondsPast < 60) {
		return parseInt(secondsPast) + `${hebrew ? ' שניות' : ' s'}`
	}
	if (secondsPast < 3600) {
		return parseInt(secondsPast / 60) + `${hebrew ? ' דקות' : ' min'}`
	}
	if (secondsPast <= 86400) {
		return parseInt(secondsPast / 3600) + `${hebrew ? ' שעות' : ' hours'}`
	}

	else {
		return parseInt(secondsPast / 86400) + `${hebrew ? ' ימים' : ' days'}`
	}
}
