import { enableHitTest } from "./hitTest";
import { enableAnchorSystem } from "./anchorSystem";

export async function enableXrExperience(scene) {
  try {
    const xr = await scene.createDefaultXRExperienceAsync({
      uiOptions: { sessionMode: "immersive-ar" },
      optionalFeatures: true,
    });

    const fm = xr.baseExperience.featuresManager;

    enableHitTest(fm, scene);
    enableAnchorSystem(fm, scene);
  } catch (error) {
    console.log(error);
  }
}
