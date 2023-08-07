class StoreDelegate {
	constructor(canvas) {
		this.canvas = canvas;
	}

	onBootstrap() {
		this.canvas.drawLines();
	}

	onAddLine(data, local) {
		if (!local) {
			this.canvas.drawLine(data.line);
		}
	}
}

export default StoreDelegate;
