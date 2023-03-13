import { Direction } from '../types'

export type DPadInputHandler = (input: Direction) => void
abstract class Controller {
	/**
	 * Used for controller discovery. The implementation should resolve the promise when the controller is found / connected.
	 */
	public async discover(race: Promise<any>): Promise<void> {}
	/**
	 * Used to pass controller dpad input back to the quickchat class. The implementation should call the handler function whenever a dpad direction is pressed.
	 * @param handler The `QuickChat.onDpadInput` function.
	 */
	public setDpadInputHandler(handler?: DPadInputHandler): void {}

	public async init(): Promise<void> {}

	public async rumble(): Promise<void> {}
}

export default Controller
