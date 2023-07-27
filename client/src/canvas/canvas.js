import StoreDelegate from "./store-delegate.js";
import Line from "./line.js";

class Canvas {
	constructor(store, element) {
		this.store = store;
		this.element = element;
		this.store.attach(new StoreDelegate(this));

		this.resize();
		this.element.addEventListener("mousedown", this.startDrawing.bind(this));
		this.element.addEventListener("mousemove", this.draw.bind(this));
		this.element.addEventListener("mouseup", this.stopDrawing.bind(this));
		this.element.addEventListener("mouseout", this.stopDrawing.bind(this));
		window.addEventListener("resize", this.resize.bind(this));
		this.drawing = false;
	}

	draw(event) {
		if (!this.drawing) return;
		const lineData = { x1: this.x, y1: this.y, x2: event.offsetX, y2: event.offsetY };
		const line = new Line(this.x, this.y, event.offsetX, event.offsetY);
		line.draw(this.ctx);
		this.store.addLine(lineData, true);
		this.x = event.offsetX;
		this.y = event.offsetY;
	}

	startDrawing(event) {
		this.drawing = true;
		this.x = event.offsetX;
		this.y = event.offsetY;
	}

	stopDrawing(event) {
		this.drawing = false;
	}

	resize() {
		this.element.width = window.innerWidth;
		this.element.height = window.innerHeight;
		this.setContext();
		this.drawLines();
	}

	drawLines() {
		for (const lineData of this.store.lines) {
			this.drawLine(lineData);
		}
	}

	drawLine(lineData) {
		const { x1, y1, x2, y2 } = lineData;
		const line = new Line(x1, y1, x2, y2);
		line.draw(this.ctx);
	}

	setContext() {
		this.ctx = this.element.getContext("2d", { desynchronized: true });
		this.ctx.lineWidth = 2;
		this.ctx.strokeStyle = "blue";
	}
}

export default Canvas;
