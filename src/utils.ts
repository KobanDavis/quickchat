/**
 * Simple sleep util fn
 * @param ms The duration to sleep for in ms.
 */
function sleep(ms: number): Promise<void> {
	return new Promise((r) => setTimeout(r, ms))
}

function timestamp() {
	let date = ''
	const time = new Date()
	date += time.getHours().toString().padStart(2, '0') + ':'
	date += time.getMinutes().toString().padStart(2, '0') + ':'
	date += time.getSeconds().toString().padStart(2, '0')
	return date
}

const consoleLog = console.log
console.log = () => {} // surpress annoying messages from other libraries

const log = {
	info: (...logs: any[]) => consoleLog(`[${timestamp()}]`, '\x1b[38;5;6m[INFO]\x1b[0m', ...logs),
	error: (...logs: any[]) => consoleLog(`[${timestamp()}]`, '\x1b[38;5;1m[ERROR]\x1b[0m', ...logs)
}
export { sleep, log, timestamp }
