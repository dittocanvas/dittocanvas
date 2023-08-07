class Canvas {
	constructor(id) {
		this.clients = {};
		this.id = id;
		this.lines = [];
	}

	relay(fromClientId, command, data) {
		for (const client of Object.values(this.clients)) {
			if (client.id !== fromClientId) {
				client.sendCommand(command, data);
			}
		}
	}

	addClient(client) {
		this.clients[client.id] = client;
		client.attachCanvas(this.id);
	}

	removeClient(client) {
		delete this.clients[client.id];
	}

	addLine(line) {
		this.lines.push(line);
	}
}

export default Canvas;
