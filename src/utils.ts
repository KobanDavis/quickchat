/**
 * Simple sleep util fn
 * @param ms The duration to sleep for in ms.
 */
function sleep(ms: number): Promise<void> {
	return new Promise((r) => setTimeout(r, ms))
}

const log = {
	info: (...logs: any[]) => console.log('\x1b[38;5;6m[INFO]\x1b[0m', ...logs),
	error: (...logs: any[]) => console.log('\x1b[38;5;1m[ERROR]\x1b[0m', ...logs)
}
export { sleep, log }
