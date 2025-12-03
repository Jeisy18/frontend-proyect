import {
  FaceLandmarker,
  FilesetResolver
} from "@mediapipe/tasks-vision";

let mpReady = false;
let faceLandmarker = null;

export async function loadMediaPipe() {
  if (mpReady) return faceLandmarker;

  const vision = await FilesetResolver.forVisionTasks(
    "/models/vision_wasm/"
  );

  faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: "/models/face_landmarker.task",
    },
    numFaces: 1,
    runningMode: "IMAGE",
  });

  mpReady = true;
  return faceLandmarker;
}
