async function load() {
  const response = await fetch('/api/analysis');
  const data = await response.json();

  document.getElementById('summary').innerHTML = [
    ['Наблюдений', data.summary.observations],
    ['Среднее Y', data.summary.averageY.toFixed(2)],
    ['Corr X1,Y', data.methods.correlationAnalysis.x1_y.toFixed(3)],
    ['CAPM Beta', data.methods.capm.beta.toFixed(3)]
  ].map(([label, value]) => `
    <div class="card">
      <div>${label}</div>
      <div class="metric-value">${value}</div>
    </div>
  `).join('');

  document.getElementById('metrics').textContent = JSON.stringify(data.methods, null, 2);

  const labels = data.raw.map((row) => row.month);

  new Chart(document.getElementById('linearChart'), {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Наблюдения',
          data: data.raw.map((row) => ({ x: row.x1, y: row.y })),
          backgroundColor: '#2563eb'
        },
        {
          label: 'Линия регрессии',
          type: 'line',
          data: data.raw.map((row, i) => ({ x: row.x1, y: data.derived.linearPredicted[i] })),
          borderColor: '#dc2626'
        }
      ]
    }
  });

  new Chart(document.getElementById('timeSeriesChart'), {
    type: 'line',
    data: {
      labels,
      datasets: [{ label: 'Y по месяцам', data: data.methods.timeSeriesAnalysis.series, borderColor: '#22c55e' }]
    }
  });

  new Chart(document.getElementById('spatialChart'), {
    type: 'bar',
    data: {
      labels: Object.keys(data.methods.spatialCrossSectionalAnalysis),
      datasets: [{ label: 'Средний Y по регионам', data: Object.values(data.methods.spatialCrossSectionalAnalysis), backgroundColor: '#f59e0b' }]
    }
  });

  new Chart(document.getElementById('capmChart'), {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Доходности',
          data: data.raw.map((row) => ({ x: row.marketReturn, y: row.assetReturn })),
          backgroundColor: '#8b5cf6'
        },
        {
          label: 'CAPM линия',
          type: 'line',
          data: data.raw.map((row, i) => ({ x: row.marketReturn, y: data.derived.capmPredicted[i] + 0.005 })),
          borderColor: '#ef4444'
        }
      ]
    }
  });

  const grouped = data.raw.reduce((acc, row) => {
    acc[row.category] = acc[row.category] || [];
    acc[row.category].push(row.y);
    return acc;
  }, {});

  new Chart(document.getElementById('anovaChart'), {
    type: 'bar',
    data: {
      labels: Object.keys(grouped),
      datasets: [{ label: 'Средние по группам', data: Object.values(grouped).map(values => values.reduce((a,b)=>a+b,0)/values.length), backgroundColor: '#14b8a6' }]
    }
  });

  new Chart(document.getElementById('residualChart'), {
    type: 'line',
    data: {
      labels,
      datasets: [{ label: 'Residuals', data: data.derived.multipleResiduals, borderColor: '#f97316' }]
    }
  });
}

load();
