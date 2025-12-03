// ---------------------------------------------
// Crear detalle de horario
// ---------------------------------------------
export async function createScheduleDetail(scheduleSetId, payload) {
  const res = await fetch(
    `http://localhost:3001/schedule-sets/${scheduleSetId}/details`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        week_day: parseInt(payload.week_day, 10),
        check_in: payload.check_in,
        check_out: payload.check_out,
        lunch_start: payload.lunch_start || null,
        lunch_end: payload.lunch_end || null,
      }),
    }
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Error creando detalle");
  }

  return res.json();
}

// ---------------------------------------------
// Obtener TODOS los detalles del ScheduleSet
// ---------------------------------------------
export async function getScheduleDetails(scheduleSetId) {
  const res = await fetch(
    `http://localhost:3001/schedule-sets/${scheduleSetId}/details`,
    {
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Error obteniendo detalles");
  }

  return res.json();
}

// ---------------------------------------------
// Actualizar un detalle
// ---------------------------------------------
export async function updateScheduleDetail(detailId, payload) {
  const res = await fetch(
    `http://localhost:3001/schedule-sets/${payload.schedules_set_id}/details/${detailId}`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        week_day: parseInt(payload.week_day, 10),
        check_in: payload.check_in,
        check_out: payload.check_out,
        lunch_start: payload.lunch_start || null,
        lunch_end: payload.lunch_end || null,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Error actualizando detalle");
  }

  return res.json();
}

// ---------------------------------------------
// Eliminar detalle
// ---------------------------------------------
export async function deleteScheduleDetail(scheduleSetId, detailId) {
  const res = await fetch(
    `http://localhost:3001/schedule-sets/${scheduleSetId}/details/${detailId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Error eliminando detalle");
  }

  return res.json();
}
