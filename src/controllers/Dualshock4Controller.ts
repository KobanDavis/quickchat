import { DualShock, DualShockState } from '@uspasojevic/dualshock4'
import Controller, { DPadInputHandler } from './Controller'

class DualShock4Controller implements Controller {
	private _controller: DualShock
	private _dpadInputHandler: DPadInputHandler = null
	private _lastEvent: Partial<DualShockState> = {}

	private _handleEvent(_newEvent: Partial<DualShockState>) {
		if (!_newEvent.dPadUp && this._lastEvent.dPadUp) {
			this._dpadInputHandler?.('up')
		} else if (!_newEvent.dPadDown && this._lastEvent.dPadDown) {
			this._dpadInputHandler?.('down')
		} else if (!_newEvent.dPadLeft && this._lastEvent.dPadLeft) {
			this._dpadInputHandler?.('left')
		} else if (!_newEvent.dPadRight && this._lastEvent.dPadRight) {
			this._dpadInputHandler?.('right')
		}

		this._lastEvent = _newEvent
	}

	public discover(race: Promise<any>): Promise<void> {
		return new Promise((resolve) => {
			this._controller = new DualShock({
				vendorID: 1356,
				productID: 1476
			})

			this._controller.state.subscribe(this._handleEvent.bind(this))

			const discoveryInterval = setInterval(() => {
				this._controller.connect()
				if (this._controller.state.value.timestamp) {
					resolve()
				}
			}, 1000)

			// cleanup once controller is found
			race.then(() => {
				clearInterval(discoveryInterval)
			})
		})
	}

	public init(): Promise<void> {
		return Promise.resolve()
	}

	public rumble(): Promise<void> {
		return Promise.resolve()
	}

	public setDpadInputHandler(handler: DPadInputHandler): void {
		this._dpadInputHandler = handler
	}
}

export default DualShock4Controller
