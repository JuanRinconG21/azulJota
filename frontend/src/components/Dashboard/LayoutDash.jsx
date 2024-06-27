import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import UseAuth from "../../helper/UseAuth";
import Aside from "./Aside";
import Navbar from "./Navbar";

const LayoutDash = () => {
  const [abrir, setAbrir] = useState(false);
  const { Autenticado } = UseAuth();
  //console.log("AUTENTICADO DEL LAYAOUT", Autenticado);
  return (
    <div className="page-flex">
      <Aside abrir={abrir} setAbrir={setAbrir} />

      <div className="main-wrapper">
        <Navbar abrir={abrir} setAbrir={setAbrir} />

        {Autenticado.USUARIO_ID ? <Outlet /> : <Navigate to={"/"} />}
      </div>
    </div>
  );
};

export default LayoutDash;
