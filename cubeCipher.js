const cubeCipher = (plainText) => {
	// Alphabet to move translation
	const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789"
	const code = [
		"R U ",
		"R B ",
		"B2 U ",
		"B2 U ",
		"R U ",
		"F2 U ",
		"F2 U ",
		"U B ",
		"R U ",
		"R2 B ",
		"U2 F ",
		"D2 F ",
		"F U ",
		"U B ",
		"R2 U ",
		"R2 F ",
		"L2 F ",
		"L B ",
		"R2 U ",
		"L2 U ",
		"B U ",
		"B2 U ",
		"R U ",
		"F2 U ",
		"B U ",
		"L2 U ",
		"B U ",
		"R F ",
		"B U ",
		"L2 U ",
		"R U ",
		"R2 U ",
		"R U ",
		"R U ",
		"R2 U ",
		"R U ",
	]

	// Make string compatible ( Remove any non words and non numbers )
	let filtered = plainText.toLowerCase().replace(/[^a-z0-9]+/, "")

	// If filtered string is nothing, return nothing
	if (filtered.length === 0) {
		return ""
	}

	// Translate filtered string into algorithm
	let rotationCode = code
	let unprocessedAlg = ""
	for (let i = 0; i < filtered.length; i++) {
		let index = alphabet.indexOf(filtered[i])
		rotationCode = ((array, count) => {
			for (let i = 0; i < count + 1; i++) {
				array.push(array.shift())
			}
			return array
		})(rotationCode, index * ((index % 2) * -2 + 1))
		unprocessedAlg += rotationCode[index]
	}

	// Split the algorithm into tokens
	let tokens = unprocessedAlg.split(" ")

	// Limit the number of tokens, so the algorithm isn't too long
	while (tokens.length > 20) {
		tokens.splice(0, 1)
	}

	// Simplify the algorithm
	let simplified = ""
	while (tokens.length) {
		let symbol = tokens[0]
		let face = symbol[0]

		if (tokens.length - 1 > 0) {
			let nextSymbol = tokens[1]
			let nextFace = nextSymbol[0]

			if (face == nextFace) {
				if (face == symbol && symbol == nextSymbol) {
					// eg. R R
					simplified += face + "2" + " "
				} else if (face + "2" == symbol && nextFace == nextSymbol) {
					// eg. R2 R
					simplified += face + "'" + " "
				} else if (face == symbol && nextFace + "2" == nextSymbol) {
					// eg. R R2
					simplified += face + "'" + " "
				} else {
					simplified += symbol + nextSymbol + " "
				}
				tokens.splice(0, 2)
			}
		}

		tokens.splice(0, 1)
		simplified += symbol + " "
	}

	return simplified
}
