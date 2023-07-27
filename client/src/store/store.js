import SyncDelegate from "./sync-delegate.js";

class Store {
	constructor(sync) {
		this.id = null;
		this.lines = [];

		this.sync = sync;
		this.sync.attach(new SyncDelegate(this));
	}

	attach(delegate) {
		this.delegate = delegate;
		this.sync.start();
	}

	bootstrap(data) {
		this.id = data.id;
		this.lines = data.lines;
		this.delegate.onBootstrap();
	}

	addLine(line, local) {
		this.lines.push(line);
		if (local) {
			this.sync.send("addline", { id: this.id, line });
		} else {
			this.delegate.onAddLine(line, local);
		}
	}
}

export default Store;
