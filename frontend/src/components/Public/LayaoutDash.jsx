import { Outlet, Navigate } from "react-router-dom";
import UseAuth from "../../helper/UseAuth";

const LayoutDash = () => {
  const { Autenticado } = UseAuth();
  return Autenticado.USUARIO_ID ? <Outlet /> : <Navigate to={"/"} />;
};

export default LayoutDash;
