import { MeshBuilder, WebXRHitTest } from "babylonjs";

let enabled = false;
let lastHit = undefined;

export function getLastHit() {
  return lastHit;
}

export function enableHitTest(fm, scene) {
  try {
    const hitTest = fm.enableFeature(WebXRHitTest, "latest");
    const ground = scene.getMeshByName("ground");
    if (!ground) throw new Error("Ground not found");
    const dot = MeshBuilder.CreateSphere("dot", { diameter: 0.05 }, scene);
    hitTest.onHitTestResultObservable.add((result) => {
      if (result.length) {
        lastHit = result[0];
        result[0].transformationMatrix.decompose(
          dot.scaling,
          dot.rotationQuaternion,
          dot.position
        );
        ground.position.y = dot.position.y - 0.03;
      } else lastHit = undefined;
    });
    enabled = true;
    return hitTest;
  } catch (error) {
    console.log(error);
    enabled = false;
    return error;
  }
}
