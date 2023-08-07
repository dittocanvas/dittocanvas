import Sync from "./sync/sync";
import Store from "./store/store";
import Canvas from "./canvas/canvas";

const sync = new Sync();
const store = new Store(sync);

document.querySelector("#app").innerHTML = `<canvas></canvas>`;
const canvasElement = document.querySelector("canvas");
const canvas = new Canvas(store, canvasElement);
