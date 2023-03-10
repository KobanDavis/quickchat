const fs = require('fs')
const defaultPhrases = require('./phrases.json')
const path = require('path')

const getPhrases = () => {
	const filepath = path.join(process.cwd(), 'phrases.json')
	try {
		const userPhrases = fs.readFileSync(filepath)
		console.log('[INFO] Using custom phrases from:', filepath)
		return JSON.parse(userPhrases.toString())
	} catch {
		console.log(`[INFO] Could not find phrases file at: '${filepath}', Using default phrases.`)
		return defaultPhrases
	}
}

module.exports = getPhrases
