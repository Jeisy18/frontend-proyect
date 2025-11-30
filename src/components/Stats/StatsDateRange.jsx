export default function StatsDateRange({ range, setRange }) {
  const handleChange = (e) => {
    setRange({
      ...range,
      [e.target.name]: new Date(e.target.value),
    });
  };

  return (
    <div  style={{ display: "flex", gap: "16px", marginBottom: "24px", marginTop: "24px", flexWrap: "wrap" }}>
      <div className="form-group">
        <label className="form-label">Fecha inicio:</label>
        <input
          type="date"
          name="startDate"
          value={range.startDate.toISOString().split("T")[0]}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label"> Fecha final:</label>
        <input
          type="date"
          name="endDate"
          value={range.endDate.toISOString().split("T")[0]}
          onChange={handleChange}
          className="form-input"
        />
      </div>
    </div>
  );
}
