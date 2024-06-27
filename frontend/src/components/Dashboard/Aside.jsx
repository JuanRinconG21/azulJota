import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import img from "../../assets/img/Azul.png";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import Ubicacion from "../../helper/Ubicacion";
import UseAuth from "../../helper/UseAuth";

const Aside = ({ abrir, setAbrir }) => {
  const abrirAside = () => {
    if (abrir === true) {
      setAbrir(false);
    } else {
      setAbrir(true);
    }
  };
  const [isMobile, setIsMobile] = useState(false);
  const { Autenticado } = UseAuth();

  useEffect(() => {
    // Verificar el ancho de la ventana al cargar y redimensionar
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767); // 767px es generalmente considerado como el límite entre dispositivos móviles y de escritorio
    };

    handleResize(); // Verificar el ancho de la ventana al cargar la página

    window.addEventListener("resize", handleResize); // Verificar el ancho de la ventana al redimensionar

    // Limpiar el listener de evento al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const datos = JSON.parse(localStorage.getItem("user"));
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  // Función para alternar la visibilidad de la barra lateral
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      {!isMobile ? (
        <aside className={isSidebarVisible ? "sidebar" : "sidebar hidden"}>
          <div className="sidebar-start">
            <div className="sidebar-head">
              <a className="logo-wrapper sidebar-user">
                <span className="sidebar-user-img">
                  <img src={datos.USU_IMAGEN} alt="" />
                </span>
                <div className="sidebar-user-info">
                  <span className="sidebar-user__title">
                    {" "}
                    {datos.EMP_RAZON_SOCIAL}
                  </span>
                  <span className="sidebar-user__subtitle">
                    Nit: {datos.EMP_TERCERO}
                  </span>
                </div>
              </a>
              <button
                className="sidebar-toggle transparent-btn rotated mt-2"
                title="Menu"
                type="button"
                onClick={toggleSidebar}
              >
                <span className="sr-only">Toggle menu</span>
                <span className="icon menu-toggle" aria-hidden="true"></span>
              </button>
            </div>
            <div className="sidebar-body">
              <ul className="sidebar-body-menu">
                <li>
                  <NavLink to="/Dashboard">
                    <span className="icon home" aria-hidden="true"></span>
                    General
                  </NavLink>
                </li>
                <li>
                  <NavLink to="Main">
                    <span className="icon" aria-hidden="true">
                      <MonetizationOnIcon />
                    </span>
                    Ventas
                  </NavLink>
                </li>
                <li>
                  <NavLink to="d">
                    <span className="icon" aria-hidden="true">
                      <ShoppingCartIcon />
                    </span>
                    Compras
                  </NavLink>
                </li>
                <li>
                  <NavLink to="Egresos">
                    <span className="icon" aria-hidden="true">
                      <TrendingDownIcon />
                    </span>
                    Egresos
                  </NavLink>
                </li>
                {Autenticado.USU_ROL === true ? (
                  <>
                    <hr style={{ color: "white" }} />
                    <span style={{ color: "white" }}>
                      Administrador de Usuarios
                    </span>
                    <li>
                      <NavLink to="Administrador">
                        <span className="icon user-3" aria-hidden="true"></span>
                        Crear Usuario
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <></>
                )}
              </ul>
            </div>
          </div>

          <Ubicacion />
        </aside>
      ) : (
        <>
          <aside
            className={abrir === true ? "sidebar hidden" : "sidebar"}
            style={{ width: "280px" }}
          >
            <div className="sidebar-start">
              <div className="sidebar-head">
                <a className="logo-wrapper sidebar-user">
                  <span className="sidebar-user-img">
                    <img src={datos.USU_IMAGEN} alt="" />
                  </span>
                  <div className="sidebar-user-info">
                    <span className="sidebar-user__title">
                      {" "}
                      {datos.EMP_RAZON_SOCIAL}
                    </span>
                    <span className="sidebar-user__subtitle">
                      Nit: {datos.EMP_TERCERO}
                    </span>
                  </div>
                </a>
                <button
                  className="sidebar-toggle transparent-btn rotated"
                  title="Menu"
                  type="button"
                  onClick={abrirAside}
                >
                  <span className="sr-only">Toggle menu</span>
                  <span className="icon menu-toggle" aria-hidden="true"></span>
                </button>
              </div>
              <div className="sidebar-body">
                <ul className="sidebar-body-menu">
                  <li>
                    <NavLink to="/Dashboard">
                      <span className="icon home" aria-hidden="true"></span>
                      General
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="Main">
                      <span className="icon" aria-hidden="true">
                        <MonetizationOnIcon />
                      </span>
                      Ventas
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="d">
                      <span className="icon" aria-hidden="true">
                        <ShoppingCartIcon />
                      </span>
                      Compras
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="Egresos">
                      <span className="icon" aria-hidden="true">
                        <TrendingDownIcon />
                      </span>
                      Egresos
                    </NavLink>
                  </li>
                  {Autenticado.USU_ROL === true ? (
                    <>
                      <hr style={{ color: "white" }} />
                      <span style={{ color: "white" }}>
                        Administrador de Usuarios
                      </span>
                      <li>
                        <NavLink to="Administrador">
                          <span
                            className="icon user-3"
                            aria-hidden="true"
                          ></span>
                          Crear Usuario
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                </ul>
              </div>
            </div>

            <Ubicacion />
          </aside>
        </>
      )}
    </>
  );
};

export default Aside;
