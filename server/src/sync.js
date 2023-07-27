import crypto from "crypto";
import uws from "uWebSockets.js";
import Client from "./client.js";

class Sync {
	constructor(delegate) {
		this.delegate = delegate;
		this.clients = {};
		this.app = uws.App();
		this.app.ws(this.path(), { ...this.options(), ...this.handlers() });
		this.app.listen(this.port(), this.onListen.bind(this));
	}

	options() {
		return {
			compression: 0,
			maxPayloadLength: 16 * 1024 * 1024,
			idleTimeout: 10,
		};
	}

	handlers() {
		return {
			open: this.onOpen.bind(this),
			message: this.onMessage.bind(this),
			close: this.onClose.bind(this),
		};
	}

	path() {
		return "/*";
	}

	port() {
		return 9001;
	}

	onOpen(ws, req) {
		const client = new Client(ws);
		this.clients[client.id] = client;
	}

	onMessage(ws, message, isBinary) {
		const buf = Buffer.from(message);
		const json = JSON.parse(buf.toString());
		const client = this.clients[ws.clientId];
		this.delegate.onCommand(client, json.command, json.data);
	}

	onListen(listenSocket) {
		if (listenSocket) {
			console.log(`sync-server listening on port ${this.port()}`);
		}
	}

	onClose(ws, code, message) {
		const client = this.clients[ws.clientId];
		this.delegate.onClose(client);
		delete this.clients[ws.clientId];
	}
}

export default Sync;
