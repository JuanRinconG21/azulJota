import { Outlet, Navigate } from "react-router-dom";
import UseAuth from "../../helper/UseAuth";

const Layaout = () => {
  const { Autenticado } = UseAuth();
  let ultimaUbi = localStorage.getItem("lastLocation");
  return !Autenticado.USUARIO_ID ? (
    <Outlet />
  ) : !ultimaUbi ? (
    <Navigate to={"/Dashboard"} />
  ) : (
    <Navigate to={ultimaUbi}></Navigate>
  );
};

export default Layaout;
