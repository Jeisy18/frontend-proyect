
export function aggregateCompanyStats(data) {
  const aggregated = {};

  data.forEach(item => {
    const date = item.date.split("T")[0]; // solo YYYY-MM-DD
    if (!aggregated[date]) {
      aggregated[date] = {
        date,
        checkInOnTime: 0,
        checkInLate: 0,
        checkInEarly: 0,
        checkInAbsent: 0,
        lunchOnTime: 0,
        lunchLate: 0,
        lunchEarly: 0,
        lunchNotReturned: 0
      };
    }

    aggregated[date].checkInOnTime += item.checkInOnTime;
    aggregated[date].checkInLate += item.checkInLate;
    aggregated[date].checkInEarly += item.checkInEarly;
    aggregated[date].checkInAbsent += item.checkInAbsent;
    aggregated[date].lunchOnTime += item.lunchOnTime;
    aggregated[date].lunchLate += item.lunchLate;
    aggregated[date].lunchEarly += item.lunchEarly;
    aggregated[date].lunchNotReturned += item.lunchNotReturned;
  });

  return Object.values(aggregated).sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Nueva función para totales generales (para gráficas de pastel)
export function getTotalsForPie(data) {
  const totals = {
    checkInOnTime: 0,
    checkInLate: 0,
    checkInEarly: 0,
    checkInAbsent: 0,
    lunchOnTime: 0,
    lunchLate: 0,
    lunchEarly: 0,
    lunchNotReturned: 0
  };

  data.forEach(item => {
    totals.checkInOnTime += item.checkInOnTime;
    totals.checkInLate += item.checkInLate;
    totals.checkInEarly += item.checkInEarly;
    totals.checkInAbsent += item.checkInAbsent;
    totals.lunchOnTime += item.lunchOnTime;
    totals.lunchLate += item.lunchLate;
    totals.lunchEarly += item.lunchEarly;
    totals.lunchNotReturned += item.lunchNotReturned;
  });

  return totals;
}
