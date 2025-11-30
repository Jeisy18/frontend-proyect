export default function StatsSummaryCards({ stats }) {
  const summary = stats.reduce(
    (acc, s) => {
      acc.checkInOnTime += s.checkInOnTime;
      acc.checkInLate += s.checkInLate;
      acc.checkInEarly += s.checkInEarly;
      acc.checkInAbsent += s.checkInAbsent;
      acc.lunchOnTime += s.lunchOnTime;
      acc.lunchLate += s.lunchLate;
      acc.lunchEarly += s.lunchEarly;
      acc.lunchNotReturned += s.lunchNotReturned;
      return acc;
    },
    {
      checkInOnTime: 0,
      checkInLate: 0,
      checkInEarly: 0,
      checkInAbsent: 0,
      lunchOnTime: 0,
      lunchLate: 0,
      lunchEarly: 0,
      lunchNotReturned: 0,
    }
  );

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "16px", marginBottom: "24px" }}>
      {Object.entries(summary).map(([key, value]) => (
        <div key={key} className="login-card">
          <h4>{key}</h4>
          <p>{value}</p>
        </div>
      ))}
    </div>
  );
}
