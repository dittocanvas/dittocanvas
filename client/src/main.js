import Canvas from "./lib/canvas.js";

document.querySelector("#app").innerHTML = `<canvas></canvas>`;
const canvasElement = document.querySelector("canvas");
new Canvas(canvasElement);
