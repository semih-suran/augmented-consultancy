import { Scene, FreeCamera, Vector3 } from "babylonjs";
import { enableXrExperience } from "../features/xrExperience";
import { createArGround } from "../tools";

export async function startScene(engine) {
  const scene = new Scene(engine);
  const cam = new FreeCamera("cam", new Vector3(0, 0, -2), scene);
  cam.attachControl();

  const ground = createArGround(scene);

  await scene.whenReadyAsync();

  await enableXrExperience(scene);

  return scene;
}
