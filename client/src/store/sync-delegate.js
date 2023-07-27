class SyncDelegate {
	constructor(store) {
		this.store = store;
	}

	onReady(send) {
		const id = window.location.pathname.split("/")[1];
		if (id) {
			send("listen", { id });
		} else {
			send("create", {});
		}
	}

	onCommand(command, data) {
		switch (command) {
			case "bootstrap":
				window.history.pushState({}, "", `/${data.id}`);
				this.store.bootstrap(data);
				break;
			case "addline":
				this.store.addLine(data, false);
				break;
		}
	}
}

export default SyncDelegate;
