import phrases from './phrases'
import { Key, keyboard } from '@nut-tree/nut-js'
import { Dualsense } from 'dualsense-ts'

import type { Direction } from './types'

keyboard.config.autoDelayMs = 0

let typing = false
let clearBufferTimeout: NodeJS.Timeout

const controller = new Dualsense()
const dpadInputBuffer: Direction[] = []

const clearBuffer = () => dpadInputBuffer.splice(0, dpadInputBuffer.length)

const sendMessage = async ([first, second]: Direction[]) => {
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

	typing = false
}

const main = async () => {
	const isConnected = await new Promise<boolean>((resolve) => controller.connection.once('change', ({ active }) => resolve(active)))
	if (!isConnected) {
		console.error('Gamepad not connected.')
		process.exit(1)
	} else {
		console.log('Gamepad connected.')
	}

	const inputs: Direction[] = ['up', 'down', 'left', 'right']
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
}

main()
