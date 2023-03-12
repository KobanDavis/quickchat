import fs from 'fs'
import path from 'path'
import defaultPhrases from './phrases.json'
import { Key, keyboard } from '@nut-tree/nut-js'
import { Controller } from './controllers'
import { log } from './utils'
import type { Direction, Phrases } from './types'
import { execSync } from 'child_process'

keyboard.config.autoDelayMs = 0

class QuickChat {
	private _phrases: Phrases = null
	private _controller: Controller = null
	private _typing: boolean = false
	private _clearBufferTimeout: NodeJS.Timeout = null
	private _dpadInputBuffer: Direction[] = []
	private _bindingsEnabled: boolean = null

	constructor(private _providers: Record<string, Controller>) {}

	private _loadPhrases() {
		const filepath = path.join(process.cwd(), 'phrases.json')
		try {
			const userPhrases = fs.readFileSync(filepath)
			log.info('Using custom phrases from:', filepath)
			return JSON.parse(userPhrases.toString())
		} catch {
			log.info(`Could not find phrases file at: '${filepath}', Using default phrases.`)
			return defaultPhrases
		}
	}

	private _clearBuffer() {
		this._dpadInputBuffer = []
	}

	private _sendMessage = async ([first, second]: Direction[]) => {
		this._typing = true
		const messageArray = this._phrases[first][second]
		const message = messageArray[Math.floor(Math.random() * messageArray.length)]

		clearTimeout(this._clearBufferTimeout)
		this._clearBuffer()

		// open chat
		await keyboard.type('t')
		await new Promise((r) => setTimeout(r, 10))
		// type message
		await keyboard.type(message)
		// send
		await keyboard.type(Key.Enter)
		console.log([first, second], message)
		this._typing = false
	}

	private async _getConnectedController() {
		log.info('Searching for gamepads...')
		const [name, controller] = await Promise.race(
			Object.entries(this._providers).map(([name, controller]) => {
				return new Promise<[string, Controller]>(async (resolve) => {
					await controller.discover()
					resolve([name, controller])
				})
			})
		)
		log.info('Gamepad connected:', name)
		return controller
	}

	private _onDpadInput(input: Direction) {
		// if typing, ignore input
		if (this._typing) return

		// cancel chat if second input not pressed within 1 second
		this._clearBufferTimeout = setTimeout(this._clearBuffer.bind(this), 1000)

		// if two inputs, send message
		if (this._dpadInputBuffer.push(input) === 2) {
			this._sendMessage(this._dpadInputBuffer)
		}
	}

	private _checkRLIsRunning(): boolean {
		// windows only, linux users in shambles
		const processes = execSync('tasklist')
		return processes.toString().toLowerCase().includes('rocketleague.exe')
	}

	private _enableBindings() {
		if (this._bindingsEnabled === null || !this._bindingsEnabled) {
			this._bindingsEnabled = true
			this._controller.setDpadInputHandler(this._onDpadInput.bind(this))
			log.info('Bindings enabled.')
			this._controller.rumble()
		}
	}

	private _disableBindings() {
		if (this._bindingsEnabled === null || this._bindingsEnabled) {
			this._bindingsEnabled = false
			this._controller.setDpadInputHandler(null)
			log.info('Bindings disabled.')
			this._controller.rumble()
		}
	}

	private _pollRL() {
		this._checkRLIsRunning() ? this._enableBindings() : this._disableBindings()
	}

	public async start() {
		this._phrases = await this._loadPhrases()
		this._controller = await this._getConnectedController()

		await this._controller.init()

		log.info(this._checkRLIsRunning() ? 'Rocket league running.' : 'Rocket league is not running.')
		this._pollRL()
		setInterval(() => this._pollRL(), 5000)
	}
}

export default QuickChat
