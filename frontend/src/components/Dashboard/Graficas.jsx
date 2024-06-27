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

const Barras = () => {
  const [data, setData] = useState(null);
  const datos = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchData();
  }, []);

  const ordenDiasSemana = {
    "Lunes": 1,
    "Martes": 2,
    "Miércoles": 3,
    "Jueves": 4,
    "Viernes": 5,
    "Sábado": 6,
    "Domingo": 7
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://5.189.133.32:9060/datasnap/rest/TServerMethods/VentaUltimaSemana/${datos.EMP_TERCERO}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      console.log(responseData);

      // Ordenar los datos por día de la semana y día del mes
      responseData.sort((a, b) => {
        const diaA = ordenDiasSemana[a.dia_semana];
        const diaB = ordenDiasSemana[b.dia_semana];
        
        if (diaA !== diaB) {
          return diaA - diaB; // Ordenar por día de la semana usando el orden personalizado
        } else {
          return a.dia_mes - b.dia_mes; // Si los días de la semana son iguales, ordenar por día del mes
        }
      });

      // Objeto para almacenar datos agrupados por día
      const dataByDay = {};

      // Agrupar datos por día
      responseData.forEach((item) => {
        const key = `${item.dia_semana} ${item.dia_mes}`;
        if (!dataByDay[key]) {
          dataByDay[key] = 0;
        }
        dataByDay[key] += item.vr_total_dia;
      });

      // Separar claves y valores para usarlos en la gráfica
      const labels = Object.keys(dataByDay);
      const valores = Object.values(dataByDay);

      // Generar colores únicos para cada día
      const backgroundColors = labels.map((label, index) => {
        return index % 2 === 0 ? "rgba(255, 99, 132, 0.5)" : "rgba(54, 162, 235, 0.5)";
      });

      setData({
        labels: labels,
        datasets: [
          {
            label: "Ventas Totales",
            data: valores,
            backgroundColor: backgroundColors,
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
        text: "VENTAS ULTIMA SEMANA",
      },
    },
  };

  return (
    <div>
      {data && <Bar options={options} data={data} />}
    </div>
  );
};

export default Barras;
