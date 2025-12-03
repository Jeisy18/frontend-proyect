// src/lib/arcface.js
import * as ort from "onnxruntime-web";

let session = null;

export async function initArcfaceSession() {
  if (!session) {
    session = await ort.InferenceSession.create("/models/arcface.onnx");
    console.log("ArcFace session loaded");
  }
  return session;
}

export async function getArcfaceEmbedding(imageData) {
  if (!session) throw new Error("ArcFace session no está inicializada");

  const input = preprocessImage(imageData); // función que normaliza y reshapea

  const feeds = { input };
  const results = await session.run(feeds);

  return results.output.data; // Ajusta según tu salida
}

function preprocessImage(imageData) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 112;
  canvas.height = 112;
  ctx.drawImage(imageData, 0, 0, 112, 112);

  const imgData = ctx.getImageData(0, 0, 112, 112);
  const { data } = imgData;

  const float32Data = new Float32Array(112 * 112 * 3);

  for (let i = 0; i < 112 * 112; i++) {
    float32Data[i * 3 + 0] = (data[i * 4 + 0] / 127.5) - 1;
    float32Data[i * 3 + 1] = (data[i * 4 + 1] / 127.5) - 1;
    float32Data[i * 3 + 2] = (data[i * 4 + 2] / 127.5) - 1;
  }

  return new ort.Tensor("float32", float32Data, [1, 3, 112, 112]);
}
