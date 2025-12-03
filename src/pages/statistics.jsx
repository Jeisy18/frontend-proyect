import { useState, useEffect } from "react";
import Navbar from "../components/NavbarSupervisor";
import StatsEmployeeSelect from "../components/Stats/StatsEmployeeSelect";
import StatsDateRange from "../components/Stats/StatsDateRange";
import StatsTable from "../components/Stats/StatsTable";
import StatsCharts from "../components/Stats/StatsChart";
import EmployeeGroups from "../components/Stats/EmployeeGroups";
import { getCompanyStats, getEmployeeStats, getCompanyAdvancedStats } from "../api/stats.api";
import { aggregateCompanyStats } from "../utils/stats.utils";

export default function StatisticsPage() {
  const today = new Date().toISOString().split("T")[0];
  const [range, setRange] = useState({
    startDate: new Date(today),
    endDate: new Date(today),
  });

  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [employeeGroups, setEmployeeGroups] = useState(null);

  async function fetchStats() {
    setLoading(true);
    setError("");

    try {
      const startDateStr = range.startDate.toISOString();
      const endDateStr = range.endDate.toISOString();

      if (selectedEmployee) {
        //Si hay empleado seleccionado: SOLO estadísticas individuales
        const data = await getEmployeeStats({
          employeeId: selectedEmployee,
          startDate: startDateStr,
          endDate: endDateStr,
        });

        setStats(data);
        setEmployeeGroups(null); // no mostrar grupos
      } else {
        // Estats de toda la empresa
        const rawData = await getCompanyStats({
          startDate: startDateStr,
          endDate: endDateStr,
        });

        setStats(aggregateCompanyStats(rawData));

        //ESTADÍSTICAS AVANZADAS (punctual, late, early, absent...)
        const groups = await getCompanyAdvancedStats({
          startDate: startDateStr,
          endDate: endDateStr,
        });

        setEmployeeGroups(groups); 
      }
    } catch (err) {
      console.error(err);
      setError("Error al cargar las estadísticas");
      setStats([]);
      setEmployeeGroups(null);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchStats();
  }, [range, selectedEmployee]);

  const chartData = stats.map((s) => ({
    date: s.date,
    Puntual: s.checkInOnTime,
    Retraso: s.checkInLate,
    Temprano: s.checkInEarly,
    Faltas: s.checkInAbsent,
    "Puntual regreso comida": s.lunchOnTime,
    "Retraso regreso comida": s.lunchLate,
    "Temprano regreso comida": s.lunchEarly,
    "No Regresó": s.lunchNotReturned,
  }));

  const totalCheckIn = stats.reduce(
    (acc, s) => ({
      Puntual: acc.Puntual + s.checkInOnTime,
      Retraso: acc.Retraso + s.checkInLate,
      Temprano: acc.Temprano + s.checkInEarly,
      Faltas: acc.Faltas + s.checkInAbsent,
    }),
    { Puntual: 0, Retraso: 0, Temprano: 0, Faltas: 0 }
  );

  const totalLunch = stats.reduce(
    (acc, s) => ({
      Puntual: acc.Puntual + s.lunchOnTime,
      Retraso: acc.Retraso + s.lunchLate,
      Temprano: acc.Temprano + s.lunchEarly,
      NoRegreso: acc.NoRegreso + s.lunchNotReturned,
    }),
    { Puntual: 0, Retraso: 0, Temprano: 0, NoRegreso: 0 }
  );

  const pieCheckInData = Object.entries(totalCheckIn).map(([key, value]) => ({
    name: key,
    value,
  }));

  const pieLunchData = Object.entries(totalLunch).map(([key, value]) => ({
    name: key,
    value,
  }));

  return (
    <div>
      <Navbar /> 
      <div className="pageContainer">
        <div className="contentContainer" style={{marginLeft:"60px"}}>
          <h1 className="pageTitle" style={{ textAlign: "center" }}>Estadísticas de Asistencia</h1>

          <div className="filtersContainer">
            <StatsEmployeeSelect
              selectedEmployee={selectedEmployee}
              setSelectedEmployee={setSelectedEmployee}
            />
            <StatsDateRange range={range} setRange={setRange} />
          </div>

          {/* Mensajes */}
          {loading && <p style={{ textAlign: "center" }}>Cargando estadísticas...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Tabla */}
          {!loading && !error && stats.length > 0 && (
            <div className="statsCard">
              <h3>Tabla de estadísticas</h3>
              <StatsTable stats={stats} />
            </div>
          )}

          {/*Clasificacion*/}
          {!loading && !error &&  stats.length > 0 && !selectedEmployee &&  employeeGroups && (
            <div className="statsCard">
              <EmployeeGroups groups={employeeGroups} />
            </div>
          )}

          {/* Gráficas */}
          {!loading && !error && stats.length > 0 && (
            <StatsCharts
              chartData={chartData}
              pieCheckInData={pieCheckInData}
              pieLunchData={pieLunchData}
            />
          )}
          {!loading && !error && stats.length === 0 && <p style={{ textAlign: "center" }}>No hay estadísticas disponibles</p>}
        </div>
      </div>
    </div>
  );
}
