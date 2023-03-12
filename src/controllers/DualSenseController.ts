import Controller, { DPadInputHandler } from './Controller'
import { Dualsense } from 'dualsense-ts'
import { Direction } from '../types'
import { log, sleep } from '../utils'

class DualSenseController implements Controller {
	private _dpadInputHandler: DPadInputHandler = null
	private _controller: Dualsense = null
	public discover(): Promise<void> {
		return new Promise((resolve) => {
			const controller = new Dualsense()
			controller.connection.addEventListener('change', ({ active }) => {
				if (active) {
					this._controller = controller
					resolve()
				}
			})
		})
	}

	private _setUpEventHandlers() {
		const directions: Direction[] = ['up', 'left', 'right', 'down']

		directions.forEach((direction) => {
			this._controller.dpad[direction].addEventListener('press', () => this._dpadInputHandler?.(direction))
		})
	}

	public async init() {
		this._setUpEventHandlers()
		this._controller.hid.on('error', log.error)
		log.info('Connection:', this._controller.hid.provider.wireless ? 'Wireless' : 'Wired')
	}

	public async rumble(): Promise<void> {
		this._controller.rumble(0.2)
		await sleep(200)
		this._controller.rumble(0)
	}

	public setDpadInputHandler(handler: (input: Direction) => void): void {
		this._dpadInputHandler = handler
	}
}

export default DualSenseController
