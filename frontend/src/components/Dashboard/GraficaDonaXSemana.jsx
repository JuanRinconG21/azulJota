import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonaEgresoUltimaSemana = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const datos = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://5.189.133.32:9060/datasnap/rest/TServerMethods/EgresoUltimaSemana/${datos.EMP_TERCERO}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al cargar los datos");
      }

      const responseData = await response.json();
      console.log(responseData); // Verifica la estructura de los datos en la consola

      // Verificamos si hay datos
      if (responseData.length === 0) {
        throw new Error("No hay datos disponibles");
      }

      // Transformar los datos para que se ajusten al formato requerido por el gráfico
      const labels = responseData.map((item) => `Fecha: ${item.fecha_dia}, ${item.dia_semana}`);
      const valores = responseData.map((item) => item.vr_total_dia);
     /*  const facturas = responseData.map((item) => ` #${item.facturas} de facturas`); 
console.log(facturas);
 */
      setData({
        labels: labels,
        datasets: [
          {
            // label: facturas,
            data: valores,
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(255, 159, 64, 0.5)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    }
  };

  const options = {
    //SI ES RESPONSIVE
    responsive: true,
    plugins: {
      legend: {
        //POSICION
        position: "right",
      },
      title: {
        display: true,
        //TITULO
        text: "Egresos última semana",
      },
    },
  };

  return (
    <div className="chart-container">
      {error && <p>Error: {error}</p>}
      {data && <Doughnut options={options} data={data} height={103} />}
      {!data && !error && <p>No hay datos disponibles</p>}
    </div>
  );
};

export default DonaEgresoUltimaSemana;
