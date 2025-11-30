const API_BASE_URL = "http://localhost:3001";


export async function getCompanyStats({ startDate, endDate }) {
  try {
    if (!startDate || !endDate) {
      throw new Error("startDate y endDate son requeridos");
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) {
      throw new Error("startDate o endDate no son fechas válidas");
    }

    const res = await fetch(
      `${API_BASE_URL}/attendance-stats/company?startDate=${start.toISOString()}&endDate=${end.toISOString()}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al obtener estadísticas de la empresa");
    }

    return await res.json();
  } catch (err) {
    console.error("Error getCompanyStats:", err);
    throw err;
  }
}



export async function getEmployeeStats({ employeeId, startDate, endDate }) {
  try {
    if (!startDate || !endDate) {
      throw new Error("startDate y endDate son requeridos");
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) {
      throw new Error("startDate o endDate no son fechas válidas");
    }

    const res = await fetch(
      `${API_BASE_URL}/attendance-stats/employee?employeeId=${employeeId}&startDate=${start.toISOString()}&endDate=${end.toISOString()}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al obtener estadísticas del empleado");
    }

    return await res.json();
  } catch (err) {
    console.error("Error getEmployeeStats:", err);
    throw err;
  }

}

export async function getCompanyAdvancedStats({ startDate, endDate }) {
  const res = await fetch(
    `${API_BASE_URL}/attendance-stats/advanced-stats?startDate=${startDate}&endDate=${endDate}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) throw new Error("Error al obtener estadísticas avanzadas");

  return await res.json();
}
