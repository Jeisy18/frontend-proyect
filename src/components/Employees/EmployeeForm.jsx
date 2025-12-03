import React, { useRef, useState } from "react";
import styles from "../../styles/employees.module.css";
import { loadMediaPipe } from "@/lib/mediapipe";
import { createEmployee, updateEmployee } from "../../api/employee.api";
import { Tensor } from "onnxruntime-web";
import { cropFaceFromMediaPipe } from "@/lib/cropFaceFromMediaPipe";
import Toast from "../Toast";

let arcfaceSession = null;

export async function initArcfaceSession() {
  if (!arcfaceSession) {
    const { InferenceSession } = await import("onnxruntime-web");
    const session = await InferenceSession.create("/models/arcface.onnx", {
      executionProviders: ["wasm"],
    });
    arcfaceSession = session;
  }
}

async function fileToImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function preprocessImage(image) {
  const canvas = document.createElement("canvas");
  const size = 112;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, size, size);
  const imageData = ctx.getImageData(0, 0, size, size);
  const data = imageData.data;
  const floatData = new Float32Array(3 * size * size);
  for (let i = 0; i < size * size; i++) {
    floatData[i] = data[i * 4] / 255;
    floatData[i + size * size] = data[i * 4 + 1] / 255;
    floatData[i + 2 * size * size] = data[i * 4 + 2] / 255;
  }
  return floatData;
}

async function getArcfaceEmbedding(image) {
  if (!arcfaceSession) throw new Error("ArcFace session not initialized");
  const floatData = preprocessImage(image);
  const tensor = new Tensor("float32", floatData, [1, 3, 112, 112]);
  const feeds = { data: tensor };
  const results = await arcfaceSession.run(feeds);
  return results.fc1.data;
}

export default function EmployeesForm({ formData, setFormData, cancel, editingId, showToastMsg, fetchEmployees }) {
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [preview, setPreview] = useState(formData.URL_photo || null);
  const [takingPhoto, setTakingPhoto] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [showToast, setShowToast] = useState(false);

  const showToastInternal = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  async function processFaceForEmbedding(file) {
    try {
      setProcessing(true);
      await initArcfaceSession();
      const img = await fileToImage(file);
      const mp = await loadMediaPipe();
      const detections = mp.detect(img);
      if (!detections?.faceLandmarks?.length) {
        showToastInternal("No se detectó rostro", "error");
        setProcessing(false);
        return;
      }
      const cropped = cropFaceFromMediaPipe(img, detections.faceLandmarks[0]);
      const vector = await getArcfaceEmbedding(cropped);
      const vectorArray = Array.from(vector);
      setFormData(prev => ({ ...prev, embedding: vectorArray }));
      setProcessing(false);
      return vectorArray;
    } catch (err) {
      showToastInternal("Error al procesar la foto. Intenta de nuevo.", "error");
      setProcessing(false);
    }
  }

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setFormData({ ...formData, photoFile: file });
    const embedding = await processFaceForEmbedding(file);
    if (embedding) setFormData(prev => ({ ...prev, embedding }));
  }

  async function startCamera() {
    setPreview(null);
    setFormData({ ...formData, photoFile: null });
    setTakingPhoto(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  }

  function capturePhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);
    canvas.toBlob(async (blob) => {
      const file = new File([blob], "photo.png", { type: "image/png" });
      setPreview(URL.createObjectURL(file));
      setFormData({ ...formData, photoFile: file });
      const embedding = await processFaceForEmbedding(file);
      if (embedding) setFormData(prev => ({ ...prev, embedding }));
    });
    stopCamera();
  }

  function stopCamera() {
    setTakingPhoto(false);
    const stream = videoRef.current?.srcObject;
    if (stream) stream.getTracks().forEach(t => t.stop());
  }

  async function handleSubmit() {
    if (!formData.photoFile && !editingId) {
      showToastMsg("La foto es obligatoria", "error");
      return;
    }
    if (!formData.embedding && !editingId) {
      showToastMsg("El vector facial no se ha generado aún", "error");
      return;
    }

    setSaving(true);
    try {
      const embeddingArray = Array.isArray(formData.embedding) ? formData.embedding : Array.from(formData.embedding);

      if (editingId) {
        await updateEmployee(editingId, formData, formData.photoFile, embeddingArray);
        showToastMsg("Empleado actualizado correctamente", "success");
      } else {
        await createEmployee(formData, formData.photoFile, embeddingArray);
        showToastMsg("Empleado creado correctamente", "success");
      }

      if (fetchEmployees) await fetchEmployees(); // <-- actualiza tabla automáticamente

      cancel();
    } catch (err) {
      showToastMsg(editingId ? "Error al actualizar empleado" : "Error al crear empleado", "error");
    }
    setSaving(false);
  }

  const isSaveDisabled = !formData.photoFile || !formData.embedding || processing || saving;

  return (
    <div className={styles.formBox}>
      <h2>{editingId ? "Editar empleado" : "Nuevo empleado"}</h2>
      <div className={styles.formGrid}>
        <input type="text" placeholder="Nombre" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={styles.input} />
        <input type="text" placeholder="Apellido" value={formData.last_name} onChange={e => setFormData({ ...formData, last_name: e.target.value })} className={styles.input} />
        <input type="text" placeholder="Matrícula" value={formData.matricula} onChange={e => setFormData({ ...formData, matricula: e.target.value })} className={styles.input} />
        <input type="text" placeholder="Teléfono" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className={styles.input} />
      </div>

      {preview && <div className={styles.previewBox}><img src={preview} className={styles.photoPreview} /></div>}

      {takingPhoto ? (
        <div className={styles.cameraBox}>
          <video ref={videoRef} autoPlay className={styles.video} />
          <div className={styles.cameraRight}>
            <button className={styles.cameraBtnMain} onClick={capturePhoto}>Tomar foto</button>
            <button className={styles.cameraBtnCancel} onClick={stopCamera}>Cancelar</button>
          </div>
          <canvas ref={canvasRef} hidden />
        </div>
      ) : (
        <div className={styles.photoButtons}>
          <button className={styles.photoBtn} onClick={() => fileInputRef.current.click()}>Subir foto</button>
          <button className={styles.photoBtn} onClick={startCamera}>Tomar foto con cámara</button>
          <input type="file" ref={fileInputRef} accept="image/*" hidden onChange={handleFileChange} />
        </div>
      )}

      <div className={styles.formButtons}>
        <button className={`${styles.btnSave} ${isSaveDisabled ? styles.btnDisabled : ""}`} onClick={handleSubmit} disabled={isSaveDisabled}>
          {processing ? "Procesando..." : saving ? "Guardando..." : editingId ? "Actualizar" : "Guardar"}
        </button>
        <button className={styles.btnCancel} onClick={cancel}>Cancelar</button>
      </div>

      {showToast && <Toast message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />}
    </div>
  );
}
