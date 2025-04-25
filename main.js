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

window.onload = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  fetchDataAndRenderChart();
};