import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#4CAF50", "#FF9800", "#2196F3", "#F44336", "#9C27B0", "#FF5722", "#FFC107", "#607D8B"];

export default function StatsCharts({ chartData, pieCheckInData, pieLunchData }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", marginTop: "32px" }}>
      {/* Contenedor de barras */}
      <div
        style={{
          background: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: "12px",
          padding: "24px",
        }}
      >
        <h3 style={{ marginBottom: "16px" }}>Resumen de Asistencia por dias</h3>
        <ResponsiveContainer width="100%" height={400} margin = {'20px'}> 
          <BarChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Puntual" fill="#4caf50ff" />
            <Bar dataKey="Retraso" fill="#f44336" />
            <Bar dataKey="Temprano" fill="#ff9800" />
            <Bar dataKey="Faltas" fill="#9c27b0" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Contenedor de pastel */}
      <div
        style={{
          display: "flex",
          gap: "32px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: "300px",
            background: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            borderRadius: "12px",
            padding: "24px",
            height: "350px",
          }}
        >
          <h3>Entradas</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieCheckInData} dataKey="value" nameKey="name" outerRadius={100} label>
                {pieCheckInData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            flex: 1,
            minWidth: "300px",
            background: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            borderRadius: "12px",
            padding: "24px",
            height: "350px",
          }}
        >
          <h3>Almuerzos</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieLunchData} dataKey="value" nameKey="name" outerRadius={100} label>
                {pieLunchData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
