class Sync {
	constructor(delegate) {
		this.delegate = delegate;
	}

	connect() {
		this.ws = new WebSocket(this.url());
		this.ws.addEventListener("open", this.onOpen.bind(this));
		this.ws.addEventListener("message", this.onMessage.bind(this));
	}

	send(message) {
		this.ws.send(message);
	}

	onOpen() {
		this.delegate.onOpen(this);
	}

	onMessage(event) {
		this.delegate.onMessage(event.data);
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
