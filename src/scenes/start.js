import {
  Scene,
  HemisphericLight,
  FreeCamera,
  Vector3,
  MeshBuilder,
  WebXRHitTest,
  WebXRAnchorSystem,
  PointerEventTypes,
  SceneLoader,
  Scalar,
} from "babylonjs";

export async function startScene(engine) {
  const scene = new Scene(engine);

  const light = new HemisphericLight("light", new Vector3(0, 2, 0), scene);
  const cam = new FreeCamera("cam", new Vector3(0, 0, -2), scene);
  cam.attachControl();

  const dot = MeshBuilder.CreateSphere("dot", { diameter: 0.1 }, scene);

  const { meshes, animationGroups } = await SceneLoader.ImportMeshAsync(
    "",
    "./models/",
    "first_plate.glb",
    scene
  );

  meshes[0].position.x = 2;

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
    const clone = meshes[0].clone();
    anchor.attachedNode = clone;
  });

  scene.onPointerObservable.add((event) => {
    if (lastHit && anchorSystem)
      anchorSystem.addAnchorPointUsingHitTestResultAsync(lastHit);
  }, PointerEventTypes.POINTERDOWN);

  await scene.whenReadyAsync();

  return scene;
}
