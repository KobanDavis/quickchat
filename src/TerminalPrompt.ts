import readline from 'node:readline'
import { log } from './utils'

class TerminalPrompt {
	private _index: number = 0
	constructor(private _options: string[], private _prompt?: string) {}

	private _clearRows(count: number) {
		readline.moveCursor(process.stdout, 0, -count)
		readline.clearScreenDown(process.stdout)
	}

	private _writePrompt() {
		const message = this._options.map((file, index) => (this._index === index ? '\x1b[38;5;6m> ' : '  ') + file + '\x1b[0m\n').join('')
		process.stdout.write(message)
	}

	private _handleKeyInput(key: Buffer, resolve: (s: string) => void, handler: (chunk: any) => void) {
		switch (key.toString()) {
			case '\x1B[A': // up
				this._index = this._index > 0 ? this._index - 1 : this._options.length - 1
				break
			case '\x1B[B': // down
				this._index = this._index === this._options.length - 1 ? 0 : this._index + 1
				break
			case '\x0D': // enter
				process.stdout.removeListener('data', handler)
				this._clearRows(this._options.length)
				resolve(this._options[this._index])
				return
			default:
				return
		}

		this._clearRows(this._options.length)
		this._writePrompt()
	}

	public async start() {
		const wasRaw = process.stdin.isRaw
		process.stdin.setRawMode(true)
		process.stdin.resume()
		return new Promise<string>((resolve) => {
			const handler = (key: Buffer) => {
				this._handleKeyInput(key, resolve, handler)
			}
			process.stdin.on('data', handler)

			if (this._prompt) {
				log.info(this._prompt)
			}
			this._writePrompt()
		}).then((selection) => {
			if (wasRaw === false) {
				process.stdin.setRawMode(false)
				process.stdin.resume()
			}
			if (this._prompt) {
				this._clearRows(1)
			}
			return selection
		})
	}
}

export default TerminalPrompt
