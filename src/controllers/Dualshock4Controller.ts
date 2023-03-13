import { DualShock } from '@uspasojevic/dualshock4'
import { Direction } from '../types';
import Controller, { DPadInputHandler } from './Controller';

class DualShock4Controller implements Controller {
	private _controller: DualShock;
	private _dpadInputHandler: DPadInputHandler = null
	private _oldDpadState = {
		up: false,
		down: false,
		left: false,
		right: false,
	}
	public discover(): Promise<void> {
		return new Promise(async resolve => {
			this._controller = new DualShock({
				vendorID: 1356,
				productID: 1476,
			});
			this._controller.state.subscribe(event => {
				if (event.dPadUp === false && this._oldDpadState.up === true) {
					this._dpadInputHandler?.('up')
				}
				else if (event.dPadDown === false && this._oldDpadState.down === true) {
					this._dpadInputHandler?.('down')
				}
				else if (event.dPadLeft === false && this._oldDpadState.left === true) {
					this._dpadInputHandler?.('left')
				}
				else if (event.dPadRight === false && this._oldDpadState.right === true) {
					this._dpadInputHandler?.('right')
				}
				this._oldDpadState = {
					up: event.dPadUp,
					down: event.dPadDown,
					left: event.dPadLeft,
					right: event.dPadRight,
				};
			})
			this._controller.connect();
			resolve()
		})
	}

	public init(): Promise<void> {
		return Promise.resolve()
	}

	public rumble(): Promise<void> {
		return Promise.resolve()
	}

	public setDpadInputHandler(handler: (input: Direction) => void): void {
		this._dpadInputHandler = handler
	}
}

export default DualShock4Controller
