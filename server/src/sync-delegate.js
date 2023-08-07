import store from "./store.js";

class SyncDelegate {
	onCommand(client, command, data) {
		switch (command) {
			case "create":
				this.onCreate(client, data);
				break;
			case "listen":
				this.onListen(client, data);
				break;
			case "addline":
				this.onAddLine(client, data);
				break;
		}
	}

	onCreate(client, data) {
		const canvas = store.createCanvas();
		canvas.addClient(client);
		client.sendCommand("bootstrap", { id: canvas.id, lines: canvas.lines });
	}

	onListen(client, data) {
		const canvas = store.getCanvas(data.id);
		if (canvas) {
			canvas.addClient(client);
			client.sendCommand("bootstrap", { id: canvas.id, lines: canvas.lines });
		}
	}

	onAddLine(client, data) {
		const { id, line } = data;
		const canvas = store.getCanvas(id);

		if (canvas) {
			canvas.addLine(line);
			canvas.relay(client.id, "addline", data);
		}
	}

	onClose(client) {
		const canvas = store.getCanvas(client.canvasId);
		if (canvas) {
			canvas.removeClient(client);
		}
	}
}

export default SyncDelegate;
