import { WebXRAnchorSystem, PointerEventTypes } from "babylonjs";

let enabled = false;

export function enableAnchorSystem(fm, scene) {
  try {
    const anchorSystem = fm.enableFeature(WebXRAnchorSystem, "latest");

    anchorSystem.onAnchorAddedObservable.add((anchor) => {
      //
    });
    enabled = true;
    scene.onPointerObservable.add((event) => {
      //
    }, PointerEventTypes.POINTERDOWN);
    return anchorSystem;
  } catch (error) {
    console.log(error);
    enabled = false;
    return error;
  }
}
