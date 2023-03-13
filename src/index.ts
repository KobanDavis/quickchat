import { Controller, DualSenseController, Dualshock4Controller } from './controllers'
import QuickChat from './QuickChat'

const providers: Record<string, Controller> = {
	DualSense: new DualSenseController(),
	Dualshock4: new Dualshock4Controller()
}

const qc = new QuickChat(providers)
qc.start()
