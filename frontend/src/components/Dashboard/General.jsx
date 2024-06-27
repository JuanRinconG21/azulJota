import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';


import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Main from "./Main";


const General = () => {
  //////VENTA ULTIMA SEMANA///////////

  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");
  const [totalsemana, setTotalsemana] = useState(0);
  const datos = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://5.189.133.32:9060/datasnap/rest/TServerMethods/VentaUltimaSemana/${datos.EMP_TERCERO}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Puedes incluir aquí el token si es necesario
            // "Authorization": `Bearer ${token}`
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();

      // Clonar el array de datos para no modificar el original
      const sortedData = [...responseData];

      // Ordenar los datos por día del mes
      sortedData.sort((a, b) => a.dia_mes - b.dia_mes);

      // Calcular el total de ventas para la semana
      const total = sortedData.reduce(
        (accumulatedTotal, currentItem) =>
          accumulatedTotal + currentItem.vr_total_dia,
        0
      );
      setTotalsemana(total);

      // Establecer los datos ordenados en el estado
      setData(sortedData);
    } catch (error) {
      console.error("Fetch error:", error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };

  //////////FIN/////////

  ///VENTA TOTAL PERIODOSSSSSSSSS
  const [data2, setData2] = useState(null);
  const [totalPeriodo, setTotalPeriodo] = useState(0); // Estado para almacenar la suma total del período
  const token2 = localStorage.getItem("token");
  //const datos2 = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchData2();
  }, []);

  const fetchData2 = async () => {
    try {
      const response = await fetch(
        `http://5.189.133.32:9060/datasnap/rest/TServerMethods/VentaPeriodos/${datos.EMP_TERCERO}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Puedes incluir aquí el token si es necesario
            // "Authorization": `Bearer ${token}`
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      console.log(responseData); // Verifica la estructura de los datos en la consola

      // Calcula la suma total del período
      const total = responseData.reduce(
        (accumulatedTotal, currentItem) =>
          accumulatedTotal + currentItem.vr_total_periodo,
        0
      );
      setTotalPeriodo(total);

      // Establece los datos en el estado
      setData2(responseData);
    } catch (error) {
      console.error("Fetch error:", error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };
  ////////FIN/////////

  ////VENTA DIA/////////////////////

  const [data3, setData3] = useState(null);
  const [totalVentaxHora, setTotalVentaxHora] = useState(0); // Estado para almacenar la suma total del período
  const [fechaLocal, setFechaLocal] = useState(""); // Estado para almacenar la fecha local
  const token3 = localStorage.getItem("token");
  //const datos3 = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchData3();
    getLocalDate(); // Llama a la función para obtener la fecha local cuando el componente se monta
  }, []);

  const fetchData3 = async () => {
    try {
      const response = await fetch(
        `http://5.189.133.32:9060/datasnap/rest/TServerMethods/VentaxHora/${datos.EMP_TERCERO}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Puedes incluir aquí el token si es necesario
            // "Authorization": `Bearer ${token}`
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      console.log(responseData); // Verifica la estructura de los datos en la consola

      // Calcula la suma total del período
      const total = responseData.reduce(
        (accumulatedTotal, currentItem) =>
          accumulatedTotal + currentItem.venta_hora,
        0
      );
      setTotalVentaxHora(total);

      // Establece los datos en el estado
      setData3(responseData);
    } catch (error) {
      console.error("Fetch error:", error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };

  const getLocalDate = () => {
    // Crea un nuevo objeto Date para obtener la fecha local
    const localDate = new Date();

    // Formatea la fecha local según tus necesidades
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = localDate.toLocaleDateString("es-ES", options);

    // Establece la fecha local en el estado
    setFechaLocal(formattedDate);
  };
  ////////FIN////////////

  //----------------------------------------------------------------------------------//

  //----------------------------------------------------------------------------------//
  return (
    <>
      <main className="main users chart-page" id="skip-target">
        <div className="container">
          {/*aquí puede ir el titulo de bienvenida */}
          <div className="row stat-cards justify-content-center gutter-0">
    
  <h5 id="titulo" className="active mb-3">
    <i className="bi bi-three-dots-vertical text-primary"></i>
    Reporte General de Ventas
  </h5>


            <div className="col-md-6 col-xl-3 " id="cards-1">
              <article
                id="article2"
                style={{ backgroundColor: "#109bd6", color: "white" }}
                className="stat-cards-item"
              >
                <div>
                  <NavLink to="./Main">
                  <p>
                    {" "}
                    <CalendarMonthIcon />
                    Ventas de hoy
                  </p>
                  </NavLink>
                
                  <br />
                  <p>
                    Total venta del dia: ${totalVentaxHora.toLocaleString()}
                  </p>
                  <br />
                  <div className="stat-cards-info">
                    <p className="stat-cards-info__title"></p>
                    <p className="stat-cards-info__progress">
                      <span className="stat-cards-info__profit success">
                        <i
                          data-feather="trending-up"
                          className="fecha"
                          id="fecha"
                          aria-hidden="true"
                        >
                          {" "}
                        </i>
                        {fechaLocal}
                      </span>
                    </p>
                  </div>
                  {data3 ? (
                    data3.map((item, index) => (
                      <div key={index} className="stat-cards-info">
                        {/* Aquí iría el resto de la lógica para mostrar los datos de data3 */}
                      </div>
                    ))
                  ) : (
                    <p>Cargando...</p>
                  )}
                </div>
              </article>
            </div>

            <div className="col-md-6 col-xl-3">
              <article
                className="stat-cards-item"
                style={{ backgroundColor: "#109bd6", color: "white" }}
              >
<NavLink to="./Main"> 
  <p>
    {" "}
    <CalendarMonthIcon />
    Compras de hoy
  </p>
  </NavLink>   

                <div>
                  <br />
                  <p>
                    Total venta ultima semana: ${totalsemana.toLocaleString()}
                  </p>
                  <br />
                </div>
              </article>
            </div>
            <div className="col-md-6 col-xl-3">
              <article
                className="stat-cards-item"
                style={{ backgroundColor: "#109bd6", color: "white" }}
              >
                <NavLink to="./Main"> 
                <p>
                  {" "}
                  <CalendarMonthIcon />
                  Venta Últ. Periodos
                </p>
                </NavLink>
                <div>
                  <p>
                   
                    Venta total de los períodos: $
                    {totalPeriodo.toLocaleString()}
                  </p>
                  <br />
                  {data2 ? (
                    data2.map((item, index) => (
                      <div key={index} className="stat-cards-info">
                        <span className="stat-cards-info__profit success">
                          <i data-feather="trending-up" aria-hidden="true"></i>
                          {item.NOM_PERIODO}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p>Cargando...</p>
                  )}
                </div>
              </article>
            </div>
          </div>
          <div className="row stat-cards justify-content-center gutter-0">
            <h5 id="titulo" className="active mb-3"><i class="bi bi-three-dots-vertical text-success" />Reporte General de Compras</h5>

            <div className="col-md-6 col-xl-3 " id="cards-1">
              <article
                id="article2"
                style={{ backgroundColor: "#64a57a", color: "white" }}
                className="stat-cards-item"
              >
              <p>
                  {" "}
                  <CalendarMonthIcon />
                  Compras de hoy
                  {" "}
                </p>
                <div>
                  <br />
                  <p>
                    Total venta del dia: ${totalVentaxHora.toLocaleString()}
                  </p>
                  <br />
                  <div className="stat-cards-info">
                    <p className="stat-cards-info__title"></p>
                    <p className="stat-cards-info__progress">
                      <span className="stat-cards-info__profit success">
                        <i
                          data-feather="trending-up"
                          className="fecha"
                          id="fecha"
                          aria-hidden="true"
                        >
                          {" "}
                        </i>
                        {fechaLocal}
                      </span>
                    </p>
                  </div>
                  {data3 ? (
                    data3.map((item, index) => (
                      <div key={index} className="stat-cards-info">
                        {/* Aquí iría el resto de la lógica para mostrar los datos de data3 */}
                      </div>
                    ))
                  ) : (
                    <p>Cargando...</p>
                  )}
                </div>
              </article>
            </div>

            <div className="col-md-6 col-xl-3 ">
              <article
                className="stat-cards-item"
                style={{ backgroundColor: "#64a57a", color: "white" }}
              >
          
                <p>
                  {" "}
                  <CalendarMonthIcon />
                  Compras del Periodo{" "}
                </p>

                <div>
                  <br />
                  <p>
                    Total venta ultima semana: ${totalsemana.toLocaleString()}
                  </p>
                  <br />
                  {/*  {data ? (
                    data.map((item, index) => (
                      <div key={index} className="stat-cards-info">
                        <p className="stat-cards-info__progress">
                          <span className="stat-cards-info__profit success">
                            <i
                              data-feather="trending-up"
                              aria-hidden="true"
                            ></i>
                            {item.dia_semana}, {item.dia_mes}
                          </span>
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>Cargando...</p>
                  )} */}
                </div>
              </article>
            </div>
            <div className="col-md-6 col-xl-3 ">
              <article
                className="stat-cards-item"
                style={{ backgroundColor: "#64a57a", color: "white" }}
              >
                <p>
                  {" "}
                  <CalendarMonthIcon />
                  Compras Últ. Periodos
                </p>
                <div>
                  <p>
                    Venta total de los períodos: $
                    {totalPeriodo.toLocaleString()}
                  </p>
                  <br />
                  {data2 ? (
                    data2.map((item, index) => (
                      <div key={index} className="stat-cards-info">
                        <span className="stat-cards-info__profit success">
                          <i data-feather="trending-up" aria-hidden="true"></i>
                          {item.NOM_PERIODO}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p>Cargando...</p>
                  )}
                </div>
              </article>
            </div>
          </div>
          <div className="row stat-cards justify-content-center gutter-0">
            <h5 id="titulo" className="active mb-3"><i class="bi bi-three-dots-vertical custom-icon-color"></i>Reporte General de Egresos</h5>

            <div className="col-md-6 col-xl-3 " id="cards-1">
              <article
                id="article2"
                style={{ backgroundColor: "#ef7550", color: "white" }}
                className="stat-cards-item"
              >
                <p>
                  {" "}
                  <CalendarMonthIcon />
                  Egresos de hoy
                </p>
                <div>
                  <br />
                  <p>
                    Total venta del dia: ${totalVentaxHora.toLocaleString()}
                  </p>
                  <br />
                  <div className="stat-cards-info">
                    <p className="stat-cards-info__title"></p>
                    <p className="stat-cards-info__progress">
                      <span className="stat-cards-info__profit success">
                        <i
                          data-feather="trending-up"
                          className="fecha"
                          id="fecha"
                          aria-hidden="true"
                        >
                          {" "}
                        </i>
                        {fechaLocal}
                      </span>
                    </p>
                  </div>
                  {data3 ? (
                    data3.map((item, index) => (
                      <div key={index} className="stat-cards-info">
                        {/* Aquí iría el resto de la lógica para mostrar los datos de data3 */}
                      </div>
                    ))
                  ) : (
                    <p>Cargando...</p>
                  )}
                </div>
              </article>
            </div>

            <div className="col-md-6 col-xl-3 ">
              <article
                className="stat-cards-item"
                style={{ backgroundColor: "#ef7550", color: "white" }}
              >
                <p>
                  {" "}
                  <CalendarMonthIcon />
                  Egresos del periodo{" "}
                </p>

                <div>
                  <br />
                  <p>
                    Total venta ultima semana: ${totalsemana.toLocaleString()}
                  </p>
                  <br />
                  {/*  {data ? (
                    data.map((item, index) => (
                      <div key={index} className="stat-cards-info">
                        <p className="stat-cards-info__progress">
                          <span className="stat-cards-info__profit success">
                            <i
                              data-feather="trending-up"
                              aria-hidden="true"
                            ></i>
                            {item.dia_semana}, {item.dia_mes}
                          </span>
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>Cargando...</p>
                  )} */}
                </div>
              </article>
            </div>
            <div className="col-md-6 col-xl-3 ">
              <article
                className="stat-cards-item"
                style={{ backgroundColor: "#ef7550", color: "white" }}
              >
                <p>
                  {" "}
                  <CalendarMonthIcon />
                  Egresos Últ. Periodos
                </p>
                <div>
                  <p>
                    Venta total de los períodos: $
                    {totalPeriodo.toLocaleString()}
                  </p>
                  <br />
                  {data2 ? (
                    data2.map((item, index) => (
                      <div key={index} className="stat-cards-info">
                        <span className="stat-cards-info__profit success">
                          <i data-feather="trending-up" aria-hidden="true"></i>
                          {item.NOM_PERIODO}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p>Cargando...</p>
                  )}
                </div>
              </article>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container footer--flex">
          <div className="footer-start">
            <p>
              2021 © Elegant Dashboard -{" "}
              <a
                href="elegant-dashboard.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                elegant-dashboard.com
              </a>
            </p>
          </div>
          <ul className="footer-end">
            <li>
              <a href="##">About</a>
            </li>
            <li>
              <a href="##">Support</a>
            </li>
            <li>
              <a href="##">Puchase</a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default General;
