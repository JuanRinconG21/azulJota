import React, { useState, useRef } from "react";
import Logo from "../../assets/img/Azul.png";
import HelperForm from "../../helper/HelperForm";
import withReactContent from "sweetalert2-react-content";
import Swal2 from "sweetalert2";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import Alerta from "./Alerta";
import Cambio from "./Cambio";

const MySwal = withReactContent(Swal2);

const LoginUser = () => {
  const [signupClicked, setSignupClicked] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para manejar si la contraseña se muestra o no
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const loginTextRef = useRef(null);
  const loginFormRef = useRef(null);

  const { form, cambiar } = HelperForm({});

  const mostrarAlerta = (mensaje, icono) => {
    setAlertSeverity(icono);
    setAlertMessage(mensaje);
    setAlertOpen(true);
  };

  const handleSignupClick = () => {
    if (loginTextRef.current) {
      loginTextRef.current.style.marginLeft = "-50%";
      loginFormRef.current.style.marginLeft = "-50%";
    }
    setSignupClicked(true);
  };

  const handleLoginClick = () => {
    if (loginTextRef.current) {
      loginTextRef.current.style.marginLeft = "0px";
      loginFormRef.current.style.marginLeft = "0px";
    }
    setSignupClicked(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Cambia el estado para mostrar u ocultar la contraseña
  };

  const Login = async (e) => {
    e.preventDefault();
    let formulario = form;
    const request = await fetch("http://localhost:3600/usuarios/login", {
      method: "POST",
      body: JSON.stringify(formulario),
      headers: { "Content-Type": "application/json" },
    });
    const data = await request.json();
    if (data.id === 200) {
      let token = data.token;
      let mensaje = data.mensaje;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data.mensaje));
      mostrarAlerta(mensaje, "success");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      const USU_EMAIL = document.querySelector("#USU_EMAIL");
      const USU_PASS = document.querySelector("#USU_PASS");
      USU_EMAIL.value = "";
      USU_PASS.value = "";

      let mensaje = data.mensaje;
      mostrarAlerta(mensaje, "error");
    }
  };

  return (
    <div className="body1">
      <div className="wrapper">
        <img
          src={Logo}
          alt="Logo"
          className="rounded mx-auto d-block img-fluid"
          style={{ width: "200px", height: "auto" }}
        />

        <div className="title-text">
          <div
            className={`title login ${signupClicked ? "" : "clicked"}`}
            ref={loginTextRef}
          ></div>
          <div className={`title signup`}>Cambiar contraseña</div>
        </div>
        <div className="form-container ">
          <div className="slide-controls">
            <input
              type="radio"
              name="slide"
              id="login"
              onClick={handleLoginClick}
            />
            <input
              type="radio"
              name="slide"
              id="signup"
              onClick={handleSignupClick}
            />
            <label htmlFor="login" className={`slide login`}>
              Inicio de Sesión
            </label>
            <label htmlFor="signup" className={`slide signup`}>
              Cambio de Contraseña
            </label>
            <div className="slider-tab"></div>
          </div>
          <div className="form-inner ">
            <form
              action="#"
              className={`login  ${signupClicked ? "clicked" : ""}`}
              ref={loginFormRef}
              onSubmit={Login}
            >
              <div className="field d-flex justify-content-center">
                <input
                  type="text"
                  placeholder="Correo"
                  required
                  id="USU_EMAIL"
                  name="USU_EMAIL"
                  onChange={cambiar}
                />
              </div>
              <div className="field d-flex justify-content-center" style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"} // Muestra la contraseña si showPassword es true
                  placeholder="Contraseña"
                  required
                  id="USU_PASS"
                  name="USU_PASS"
                  onChange={cambiar}
                />
                {showPassword ? (
                  <RemoveRedEyeOutlinedIcon
                    onClick={togglePasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "20px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <VisibilityOffOutlinedIcon
                    onClick={togglePasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "20px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  />
                )}
              </div>

              <div className="field btn d-flex justify-content-center">
                <div className="btn-layer"></div>
                <input type="submit" value="Login" />
              </div>
            </form>
            <Cambio />
          </div>
        </div>
      </div>
      <Alerta
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        severity={alertSeverity}
        message={alertMessage}
      />
    </div>
  );
};

export default LoginUser;
