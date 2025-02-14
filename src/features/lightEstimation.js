import { WebXRLightEstimation } from "babylonjs";
import { createShadowGenerator } from "./shadows.js";

export function enableLightEstimation(fm, scene) {
  try {
    const le = fm.enableFeature(WebXRLightEstimation, "latest", {
      setSceneEnvironmentTexture: true,
      createDirectionalLightSource: true,
    });
    createShadowGenerator(scene, le.directionalLight);
  } catch (error) {
    console.log(error);
  }
}
