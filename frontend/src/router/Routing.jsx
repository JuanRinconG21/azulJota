import React from "react";
import LoginUser from "../components/Public/LoginUser";
//import RegistroUser from "../components/Public/Cambio";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Inicio from "../components/Dashboard/Inicio";
import Main from "../components/Dashboard/Main";
import Layaout from "../components/Public/Layaout";
import LayoutDash from "../components/Dashboard/LayoutDash";
import { AuthProvider } from "../context/AuthProvide";
import CerrarSesion from "../components/Dashboard/CerrarSesion";
//import General from "../components/Dashboard/General";
import Cambio from "../components/Public/Cambio";
import Egresos from "../components/Dashboard/Egresos";
import Administrador from "../components/Dashboard/Administrador";


const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layaout />}>
            <Route index element={<LoginUser />} />
            <Route path="/Cambio" element={<Cambio />} />
          </Route>
          <Route path="/Dashboard" element={<LayoutDash />}>
            <Route index element={<Inicio />} />
            <Route path="Main" element={<Main/>} />
            <Route path="Egresos" element={<Egresos/>} />
            <Route path="Administrador" element={<Administrador/>} />
            <Route path="Cerrar" element={<CerrarSesion />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routing;
