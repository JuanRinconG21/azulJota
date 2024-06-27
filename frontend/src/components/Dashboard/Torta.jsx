import React from "react";
//IMPORTO COMPONENTES NECESARIOS PARA LOS GRAFICOS
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
//IMPORTO EL TIPO DE GRAFICO
import { Pie } from "react-chartjs-2";

//REGISTRO LOS ELEMENTOS IMPORTADOS
ChartJS.register(ArcElement, Tooltip, Legend);


const options = {
  //SI ES RESPONSIVE
  responsive: true,
  plugins: {
    legend: {
      //POSICION
      position: "top",
    },
    title: {
      display: true,
      //TITULO
      text: "VENTA POR PERIODO",
    },
  },
};
//CREO UNA CONSTANTE DATA
const data = {
  //LOS LABELS HACE REFERENCIA A LOS NOMBRES QUE LLEVA LA GRAFICA EN LA PARTE DE ARRIBA
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      //LABEL CORRESPONDE A EL DATO QUE ESTA SIENDO CONTADO
      label: "# of Votes",
      //DATA SON LOS DATOS CORRESPONDIENTES A CADA LABEL ES DECIR COMO RED ES EL PRIMERO
      //12 VAN A SER LOS DATOS QUE SE LE ASIGNEN A RED, BLUE SERIAN 19 ETC
      data: [12, 19, 3, 5, 2, 3],
      //BACKGROUND ACA PUEDE ELEGIR UN COLOR PARA CADA DATO SE TIENE QUE PONER EN EL MISMO ORDEN DE ARRIBA
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      //BORDER LO MISMO DE DE BACKGROUD PERO SOLO EL BORDE jajajja
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      //ANHO DEL BORDE
      borderWidth: 1,
    },
  ],
};
const Torta = () => {
  {/*SE LLAMA AL COMPONENTE <Pie> y se le pasa un PROPS llamado data donde se le pasa la data que configuramos */}
  return <Pie options={options} data={data}></Pie>;
};

export default Torta;
