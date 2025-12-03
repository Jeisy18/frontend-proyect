
import * as ort from "onnxruntime-web";
import { FaceMesh } from "mediapipe";


let arcfaceSession = null;

export async function loadArcface() {
  if (arcfaceSession) return arcfaceSession;
  arcfaceSession = await ort.InferenceSession.create("/models/arcface.onnx");
  return arcfaceSession;
}


//  DETECTAR ROSTRO CON MEDIAPIPE

export async function detectFace(videoOrImage) {
  return new Promise((resolve) => {
    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    faceMesh.onResults((results) => {
      resolve(results.multiFaceLandmarks?.[0] || null);
    });

    faceMesh.send({ image: videoOrImage });
  });
}


// 3. CORTAR LA CARA Y PREPARARLA PARA ARCFACE
export function extractFace(image, landmarks) {
  const xs = landmarks.map((p) => p.x * image.width);
  const ys = landmarks.map((p) => p.y * image.height);

  const x1 = Math.max(Math.min(...xs) - 20, 0);
  const y1 = Math.max(Math.min(...ys) - 20, 0);
  const x2 = Math.min(Math.max(...xs) + 20, image.width);
  const y2 = Math.min(Math.max(...ys) + 20, image.height);

  const w = x2 - x1;
  const h = y2 - y1;

  const canvas = document.createElement("canvas");
  canvas.width = 112;
  canvas.height = 112;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, x1, y1, w, h, 0, 0, 112, 112);

  return canvas;
}

//Generamos el vector facial
export async function getFaceEmbedding(canvas) {
  await loadArcface();

  const ctx = canvas.getContext("2d");
  const data = ctx.getImageData(0, 0, 112, 112).data;

  const float32 = new Float32Array(112 * 112 * 3);

  for (let i = 0, j = 0; i < data.length; i += 4) {
    float32[j++] = data[i] / 255;
    float32[j++] = data[i + 1] / 255;
    float32[j++] = data[i + 2] / 255;
  }

  const input = new ort.Tensor("float32", float32, [1, 3, 112, 112]);

  const output = await arcfaceSession.run({ input });
  const vector = [...output["embedding"].data];

  return vector;
}


// Ejecutamos los procesos

export async function generateEmbeddingFromImage(imageElement) {
  const landmarks = await detectFace(imageElement);
  if (!landmarks) throw new Error("No se detectó ningún rostro");

  const faceCanvas = extractFace(imageElement, landmarks);
  const vector = await getFaceEmbedding(faceCanvas);

  return vector;
}
