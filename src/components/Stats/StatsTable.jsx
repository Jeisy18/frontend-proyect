export default function StatsTable({ stats }) {
  return (
    <table className="statsTable">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Entrada a tiempo</th>
          <th>Entrada tarde</th>
          <th>Entrada tenprana</th>
          <th>Faltas</th>
          <th>Almuerzo a tiempo</th>
          <th>Almuerzo tarde</th>
          <th>Almuerzo anticipado</th>
          <th>No regresó del almuerzo</th>
        </tr>
      </thead>
      <tbody>
        {stats.map((s) => (
          <tr key={s.date + s.employeeId}>
            <td>{new Date(s.date).toLocaleDateString()}</td>
            <td>{s.checkInOnTime}</td>
            <td>{s.checkInLate}</td>
            <td>{s.checkInEarly}</td>
            <td>{s.checkInAbsent}</td>
            <td>{s.lunchOnTime}</td>
            <td>{s.lunchLate}</td>
            <td>{s.lunchEarly}</td>
            <td>{s.lunchNotReturned}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
