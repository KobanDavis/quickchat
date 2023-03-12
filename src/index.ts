import { Controller, DualSenseController } from './controllers'
import QuickChat from './QuickChat'

const providers: Record<string, Controller> = {
	DualSense: new DualSenseController()
}

const qc = new QuickChat(providers)
qc.start()
