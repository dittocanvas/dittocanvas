import hello from "./lib/hello.js";

document.querySelector("#app").innerHTML = `
  <div>
    <h1>${hello()}</h1>
  </div>
`;
