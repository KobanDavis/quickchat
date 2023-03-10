const path = require('path')
const { Key, keyboard } = require('@nut-tree/nut-js')
const { Dualsense } = require('dualsense-ts')

const getPhrases = require('./phrases')
path.join(__dirname, '../node_modules/node-hid/build/Release/HID.node')
keyboard.config.autoDelayMs = 0
console.log('[INFO] Loading...')

let typing = false
let clearBufferTimeout

const phrases = getPhrases()
const controller = new Dualsense()
controller.hid.on('error', console.error)

const dpadInputBuffer = []

const pause = async (ms) => new Promise((r) => setTimeout(r, ms))

const clearBuffer = () => dpadInputBuffer.splice(0, dpadInputBuffer.length)

const rumble = async () => {
	controller.rumble(0.2)
	await pause(200)
	controller.rumble(0)
}

const sendMessage = async ([first, second]) => {
	typing = true
	const messageArray = phrases[first][second]
	const message = messageArray[Math.floor(Math.random() * messageArray.length)]

	clearTimeout(clearBufferTimeout)
	clearBuffer()

	// open chat
	await keyboard.type('t')
	await new Promise((r) => setTimeout(r, 10))
	// type message
	await keyboard.type(message)
	// send
	await keyboard.type(Key.Enter)
	console.log([first, second], message)
	typing = false
}

const main = async () => {
	const isConnected = await new Promise((resolve) => controller.connection.once('change', ({ active }) => resolve(active)))
	if (!isConnected) {
		console.error('[ERROR] Gamepad not connected.')
		process.exit(1)
	} else {
		console.log('[INFO] Gamepad connected.')
		console.log('[INFO] Connection:', controller.hid.provider.wireless ? 'Wireless' : 'Wired')
		rumble()
	}

	const inputs = ['up', 'down', 'left', 'right']
	inputs.forEach((input) => {
		controller.dpad[input].on('press', () => {
			// if typing, ignore input
			if (typing) return
			// cancel chat if second input not pressed within 1 second
			clearBufferTimeout = setTimeout(clearBuffer, 1000)

			// if two inputs, send message
			if (dpadInputBuffer.push(input) === 2) {
				sendMessage(dpadInputBuffer)
			}
		})
	})

	console.log('[INFO] D-pad bindings enabled.')
}

main()
