import { Engine, Scene } from "babylonjs";
import { startScene } from "./scenes/start.js";
import "babylonjs-loaders";

const engine = new Engine(document.querySelector("canvas"), true);

async function main() {
  const scene = await startScene(engine);

  engine.runRenderLoop(() => scene.render());
  window.addEventListener("resize", () => engine.resize());
}

main();
