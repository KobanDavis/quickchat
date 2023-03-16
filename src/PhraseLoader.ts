import fs from 'node:fs/promises'
import path from 'node:path'
import { log } from './utils'
import defaultPhrases from './defaultPhrases.json'
import TerminalPrompt from './TerminalPrompt'
import { Phrases } from './types'

class PhraseLoader {
	private async _getJSONFiles() {
		try {
			const dir = await fs.readdir(process.cwd())
			return dir.filter((file) => file.endsWith('.json'))
		} catch (e) {
			log.error('Could not read dir:', process.cwd())
			console.error(e)
			return []
		}
	}

	private async _loadPhrasesFile(name: string) {
		const filepath = path.join(process.cwd(), name)
		try {
			const userPhrases = await fs.readFile(filepath)
			log.info('Using phrases from:', filepath)
			return JSON.parse(userPhrases.toString())
		} catch {
			log.error(`Error reading phrase file at: '${filepath}'.`)
			log.error('Ensure the file contains valid JSON.')
			log.info('Using default phrases.')
			return defaultPhrases
		}
	}

	public async getPhrases(): Promise<Phrases> {
		const files = await this._getJSONFiles()
		if (files.length === 0) {
			log.info(`Could not find phrases file at: '${process.cwd()}', Using default phrases.`)
			return defaultPhrases
		}

		const defaultLabel = '(default)'
		files.push(defaultLabel)

		const prompt = new TerminalPrompt(files, 'Phrase files found. Select which file to load:')
		const file = await prompt.start()

		if (file === defaultLabel) {
			log.info('Using default phrases.')
			return defaultPhrases
		}

		return this._loadPhrasesFile(file)
	}
}

export default PhraseLoader
