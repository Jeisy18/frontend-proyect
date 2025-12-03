// Recorta el rostro usando los landmarks de MediaPipe
export function cropFaceFromMediaPipe(image, landmarks) {
  const canvas = document.createElement("canvas");
  const size = 112; // tamaño esperado por ArcFace
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  // Calcula el bounding box de los landmarks
  const xs = landmarks.map(l => l.x);
  const ys = landmarks.map(l => l.y);
  const minX = Math.min(...xs) * image.width;
  const maxX = Math.max(...xs) * image.width;
  const minY = Math.min(...ys) * image.height;
  const maxY = Math.max(...ys) * image.height;
  const width = maxX - minX;
  const height = maxY - minY;

  // Dibuja la sección del rostro en el canvas
  ctx.drawImage(image, minX, minY, width, height, 0, 0, size, size);

  // Devuelve un nuevo objeto Image listo para ArcFace
  const croppedImage = new Image();
  croppedImage.src = canvas.toDataURL();
  return croppedImage;
}
