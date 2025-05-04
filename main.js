async function cargarEvento(nombreArchivo) {
  try {
    const response = await fetch(`${nombreArchivo}.json`);
    if (!response.ok) throw new Error("Archivo no encontrado");

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
  } catch (error) {
    document.getElementById("myChart").innerHTML = `<p style="color:red;">Error al cargar datos: ${error.message}</p>`;
  }
}

