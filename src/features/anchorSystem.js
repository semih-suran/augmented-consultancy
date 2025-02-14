import { WebXRAnchorSystem, PointerEventTypes } from "babylonjs";
import { getLastHit } from "./hitTest";
import { createSphere } from "../tools";
import { applyShadow } from "./shadows";

let enabled = false;

export function enableAnchorSystem(fm, scene) {
  try {
    const anchorSystem = fm.enableFeature(WebXRAnchorSystem, "latest");

    anchorSystem.onAnchorAddedObservable.add((anchor) => {
      const sphere = createSphere(scene, { diameter: 0.015 });
      applyShadow(sphere);
      anchor.attachedNode = sphere;
    });
    enabled = true;
    scene.onPointerObservable.add((event) => {
      const lastHit = getLastHit();
      if (lastHit && anchorSystem)
        anchorSystem.addAnchorPointUsingHitTestResultAsync(lastHit);
    }, PointerEventTypes.POINTERDOWN);

    return anchorSystem;
  } catch (error) {
    console.log(error);
    enabled = false;
    return error;
  }
}
