import crypto from "crypto";
import Canvas from "./canvas.js";

class Store {
	constructor() {
		this.canvases = {};
	}

	createCanvas() {
		const id = crypto.randomUUID();
		const canvas = new Canvas(id);
		this.canvases[id] = canvas;
		return canvas;
	}

	getCanvas(id) {
		return this.canvases[id];
	}
}

export default new Store();
