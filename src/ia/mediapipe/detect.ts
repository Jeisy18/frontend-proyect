import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

let landmarker: FaceLandmarker;

export async function loadMediaPipe() {
  if (landmarker) return landmarker;

  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
  );

  landmarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/face_landmarker.task",
    },
    outputFaceBlendshapes: false,
    runningMode: "IMAGE",
  });

  return landmarker;
}

export async function detectFace(img: HTMLImageElement) {
  const mp = await loadMediaPipe();
  const res = mp.detect(img);

  if (!res.faceLandmarks.length) return null;

  return res.faceLandmarks[0]; // 468 landmarks
}
