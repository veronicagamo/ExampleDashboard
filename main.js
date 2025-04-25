async function fetchDataAndRenderChart() {
  const response = await fetch("data.json");
  const data = await response.json();

  const options = {
    container: document.getElementById("myChart"),
    data: data,
    series: [
      {
        type: "bar",
        xKey: "evento",
        yKey: "valor",
        yName: "Valor del Evento",
      },
    ],
  };

  agCharts.AgChart.create(options);
}

window.addEventListener("DOMContentLoaded", () => {
  fetchDataAndRenderChart();
});