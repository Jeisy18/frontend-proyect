import { initArcfaceSession, getArcfaceEmbedding } from "@/lib/arcface";

export async function processFaceForEmbedding(imageData) {
  try {
    await initArcfaceSession(); // carga la sesión ONNX solo una vez
    const embedding = await getArcfaceEmbedding(imageData);
    console.log("Embedding generado", embedding);
    return embedding;
  } catch (err) {
    console.error("Error procesando la imagen:", err);
    throw err; // opcional, si quieres manejarlo arriba
  }
}
