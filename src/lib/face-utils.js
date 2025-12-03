export function cropFaceFromMediaPipe(image, landmarks) {
  const xs = landmarks.map(p => p.x * image.width);
  const ys = landmarks.map(p => p.y * image.height);

  const minX = Math.max(0, Math.min(...xs) - 20);
  const minY = Math.max(0, Math.min(...ys) - 20);
  const maxX = Math.min(image.width, Math.max(...xs) + 20);
  const maxY = Math.min(image.height, Math.max(...ys) + 20);

  const w = maxX - minX;
  const h = maxY - minY;

  // Crear canvas recortado
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, minX, minY, w, h, 0, 0, w, h);

  return canvas;
}

export function preprocessImage(canvas) {
  const ctx = canvas.getContext("2d");

  const resized = document.createElement("canvas");
  resized.width = 112;
  resized.height = 112;
  const rctx = resized.getContext("2d");
  rctx.drawImage(canvas, 0, 0, 112, 112);

  const data = rctx.getImageData(0, 0, 112, 112).data;

  // Normalizar
  const float32 = new Float32Array(112 * 112 * 3);
  let idx = 0;

  for (let i = 0; i < data.length; i += 4) {
    float32[idx++] = (data[i] - 127.5) / 128;     // R
    float32[idx++] = (data[i + 1] - 127.5) / 128; // G
    float32[idx++] = (data[i + 2] - 127.5) / 128; // B
  }

  return new ort.Tensor("float32", float32, [1, 3, 112, 112]);
}
