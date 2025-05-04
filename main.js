async function cargarEvento(nombre) {
  const response = await fetch(`${nombre}.json`);
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
});

