class Canvas {
	constructor(element) {
		this.canvas = element;
		this.resize();
		this.canvas.addEventListener("mousedown", this.startDrawing.bind(this));
		this.canvas.addEventListener("mousemove", this.draw.bind(this));
		this.canvas.addEventListener("mouseup", this.stopDrawing.bind(this));
		this.canvas.addEventListener("mouseout", this.stopDrawing.bind(this));
		window.addEventListener("resize", this.resize.bind(this));
		this.drawing = false;
	}

	draw(event) {
		if (!this.drawing) return;
		console.log("drawing", event);
		this.ctx.beginPath();
		this.ctx.moveTo(this.x, this.y);
		this.ctx.lineTo(event.offsetX, event.offsetY);
		this.ctx.stroke();
		this.ctx.closePath();
		this.x = event.offsetX;
		this.y = event.offsetY;
	}

	startDrawing(event) {
		console.log("start drawing", event);
		this.drawing = true;

		this.x = event.offsetX;
		this.y = event.offsetY;
	}

	stopDrawing(event) {
		console.log("stop drawing");
		this.drawing = false;
	}

	resize() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.setContext();
	}

	setContext() {
		this.ctx = this.canvas.getContext("2d", { desynchronized: true });
		this.ctx.lineWidth = 2;
		this.ctx.strokeStyle = "blue";
	}
}

export default Canvas;
