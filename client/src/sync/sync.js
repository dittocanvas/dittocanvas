class Sync {
	attach(delegate) {
		this.delegate = delegate;
	}

	start() {
		this.ws = new WebSocket(this.url());
		this.ws.addEventListener("open", this.onReady.bind(this));
		this.ws.addEventListener("message", this.onMessage.bind(this));
	}

	send(command, data) {
		this.ws.send(JSON.stringify({ command, data }));
	}

	onReady() {
		this.delegate.onReady(this.send.bind(this));
	}

	onCommand(command, data) {
		this.delegate.onCommand(command, data);
	}

	onMessage(event) {
		const json = JSON.parse(event.data);
		this.onCommand(json.command, json.data);
	}

	url() {
		return `${this.protocol()}://${this.host()}:${this.port()}${this.path()}`;
	}

	path() {
		return "/";
	}

	port() {
		return 9001;
	}

	protocol() {
		return "ws";
	}

	host() {
		return "localhost";
	}
}

export default Sync;
