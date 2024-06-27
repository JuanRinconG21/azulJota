import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraficaBarrasXDia = () => {
  const [data, setData] = useState(null);
  const datos = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://5.189.133.32:9060/datasnap/rest/TServerMethods/EgresoxHora/${datos.EMP_TERCERO}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      console.log(responseData);

      const egresos = responseData.map((item) => item.egreso_hora);
      const labels = responseData.map((item) => item.hora_dia);

      setData({
        labels: labels,
        datasets: [
            {
                label: "Egresos",
                data: egresos,
              borderColor: "rgba(255, 99, 132, 0.5)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              type: "line",
            },
            {
              label: "Otro conjunto de datos",
              data: egresos, // Puedes reemplazar esto con los datos adecuados
              borderColor: "rgba(54, 162, 235, 0.5)",
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              type: "bar",
            },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",

      },
      title: {
        display: true,
        text: "Egresos del día por hora ",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Horas",
        },
      },
    },
  };

  return (
    <div>
      {data && <Line options={options} data={data} />}
    </div>
  );
};

export default GraficaBarrasXDia;
