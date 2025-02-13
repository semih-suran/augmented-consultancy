import {
  Scene,
  HemisphericLight,
  FreeCamera,
  Vector3,
  MeshBuilder,
  WebXRHitTest,
  WebXRAnchorSystem,
  PointerEventTypes,
} from "babylonjs";

export async function startScene(engine) {
  const scene = new Scene(engine);

  const light = new HemisphericLight("light", new Vector3(0, 2, 0), scene);
  const cam = new FreeCamera("cam", new Vector3(0, 0, -2), scene);
  cam.attachControl();

  const dot = MeshBuilder.CreateSphere("dot", { diameter: 0.5 }, scene);

  const xr = await scene.createDefaultXRExperienceAsync({
    uiOptions: { sessionMode: "immersive-ar" },
  });

  const fm = xr.baseExperience.featuresManager;
  const hitTest = fm.enableFeature(WebXRHitTest, "latest");
  const anchorSystem = fm.enableFeature(WebXRAnchorSystem, "latest");

  let lastHit = undefined;
  hitTest.onHitTestResultObservable.add((result) => {
    if (result.length) {
      lastHit = result[0];
      result[0].transformationMatrix.decompose(
        dot.scaling,
        dot.rotationQuaternion,
        dot.position
      );
    }
  });

  anchorSystem.onAnchorAddedObservable.add((anchor) => {
    anchor.attachedNode = dot.clone();
  });

  scene.onPointerObservable.add((event) => {
    if (lastHit && anchorSystem)
      anchorSystem.addAnchorPointUsingHitTestResultAsync(lastHit);
  }, PointerEventTypes.POINTERDOWN);

  await scene.whenReadyAsync();

  return scene;
}
