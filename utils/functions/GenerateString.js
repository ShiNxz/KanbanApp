// Function that generates a random string

const GenerateString = (length = 5) => {
	let text = ''
	let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

	for (var i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))

	return text
}

export default GenerateString
