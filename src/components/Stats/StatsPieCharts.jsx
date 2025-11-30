import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#4CAF50", "#FF9800", "#2196F3", "#F44336"]; // verdes, naranja, azul, rojo

export default function StatsPieCharts({ checkInData, lunchData }) {
  return (
    <div style={{ display: "flex", gap: "32px", flexWrap: "wrap", marginTop: "24px" }}>
      <div style={{ flex: 1, minWidth: "300px", height: "300px" }}>
        <h3>Entradas</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={checkInData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {checkInData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={{ flex: 1, minWidth: "300px", height: "300px" }}>
        <h3>Almuerzos</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={lunchData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              fill="#82ca9d"
              label
            >
              {lunchData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
