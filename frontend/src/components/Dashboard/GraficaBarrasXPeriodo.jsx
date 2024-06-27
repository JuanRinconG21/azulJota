import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EgresoXPeriodo = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const datos = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://5.189.133.32:9060/datasnap/rest/TServerMethods/EgresoPeriodos/${datos.EMP_TERCERO}`,
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
      console.log(responseData);

      if (responseData.length === 0) {
        throw new Error("No hay datos disponibles");
      }

      const labels = responseData.map((item) => `${item.NOM_PERIODO}, Total de facturas: ${item.facturas} `);
      const valores = responseData.map((item) => item.vr_total_periodo);
    


      setData({
        labels: labels,
        datasets: [
          {
            label: "Valor total del periodo",
            data: valores,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Cargando datos...</div>;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Egresos por periodo",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.parsed.y || 0;
            return `${label}: $${value}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Valor total",
        },
      },
      x: {
        title: {
          display: true,
          text: "Periodo",
        },
      },
    },
  };

  return (
    <div>
      {data && <Bar options={options} data={data} />}
    </div>
  );
};

export default EgresoXPeriodo;
