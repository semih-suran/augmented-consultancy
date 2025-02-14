import { Scene, HemisphericLight, FreeCamera, Vector3 } from "babylonjs";
import { enableXrExperience } from "../features/xrExperience";

export async function startScene(engine) {
  const scene = new Scene(engine);
  const light = new HemisphericLight("light", new Vector3(0, 2, 0), scene);
  const cam = new FreeCamera("cam", new Vector3(0, 0, -2), scene);
  cam.attachControl();

  await scene.whenReadyAsync();

  await enableXrExperience(scene);

  return scene;
}
