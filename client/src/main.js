import Canvas from "./lib/canvas.js";
import Sync from "./lib/sync.js";

const syncDelegate = {
	onOpen(sync) {
		console.log("ws: open");
		sync.send("hello from client!");
	},
	onMessage(message) {
		console.log("ws: message recieved:", message);
	},
};

const sync = new Sync(syncDelegate);
sync.connect();

document.querySelector("#app").innerHTML = `<canvas></canvas>`;
const canvasElement = document.querySelector("canvas");
new Canvas(canvasElement);
