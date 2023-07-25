import uws from "uWebSockets.js";

class Sync {
	constructor() {
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
			message: this.onMessage.bind(this),
		};
	}

	path() {
		return "/*";
	}

	port() {
		return 9001;
	}

	onMessage(ws, message, isBinary) {
		const buf = Buffer.from(message);
		console.log(`ws: message ${buf.toString()} ${isBinary}`);
		let ok = ws.send(message, isBinary, true);
	}

	onListen(listenSocket) {
		if (listenSocket) {
			console.log(`ws: listening on port ${this.port()}`);
		}
	}
}

export default Sync;
