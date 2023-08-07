import crypto from "crypto";

class Client {
	constructor(ws) {
		this.id = crypto.randomUUID();
		this.ws = ws;
		this.ws.clientId = this.id;
	}

	sendCommand(command, data) {
		this.ws.send(JSON.stringify({ command, data }));
	}

	attachCanvas(canvasId) {
		this.canvasId = canvasId;
	}
}

export default Client;
