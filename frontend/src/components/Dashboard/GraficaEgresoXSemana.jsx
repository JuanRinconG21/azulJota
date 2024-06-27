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

const EgresoXSemana = () => {
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
      console.log(responseData);

      if (responseData.length === 0) {
        throw new Error("No hay datos disponibles");
      }

      const diasSemana = [
        "LUNES",
        "MARTES",
        "MIÉRCOLES",
        "JUEVES",
        "VIERNES",
        "SÁBADO",
        "DOMINGO",
      ];

      const sortedData = responseData.sort((a, b) => {
        return (
          diasSemana.indexOf(a.dia_semana) - diasSemana.indexOf(b.dia_semana)
        );
      });

      const labels = sortedData.map((item) => item.dia_semana);
      const valores = sortedData.map((item) => item.vr_total_dia);
      const fechas = sortedData.map((item) => `${item.fecha_dia}, ${item.dia_semana}`);

      const datasets = [];
      fechas.forEach((fecha, index) => {
        const dataset = {
          label: fecha,
          data: valores.map((value, i) => (i === index ? value : null)),
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(153, 102, 255, 0.5)",
            "rgba(255, 159, 64, 0.5)",
          ][index % 6], // Usa un color diferente para cada fecha
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ][index % 6], // Usa un color diferente para cada fecha
          borderWidth: 1,
        };
        datasets.push(dataset);
      });

      setData({
        labels: labels,
        datasets: datasets,
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
        text: "Egresos última semana",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label;
            const valor = context.parsed.y;
            return `Fecha: ${label} - Valor: ${valor}`;
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
        offset: true, // Ajusta el desplazamiento de las etiquetas del eje X
      },
    },
    barThickness: "flex", // Ajusta el grosor de las barras para que sean del mismo tamaño
    categoryPercentage: 0.1, // Ajusta el espacio entre grupos de barras
    barPercentage: 20, // Ajusta el ancho de las barras dentro de cada grupo para que se centren
  };

  return (
    <div >{data && <Bar options={options} data={data} />}</div>
  );
};

export default EgresoXSemana;
