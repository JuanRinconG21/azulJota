import React, { useState } from "react";
/* import Swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content"; */
import HelperForm from "../../helper/HelperForm";
import "../../assets/style.css";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import { InputOtp } from "primereact/inputotp";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/themes/saga-blue/theme.css";
import Alerta from "./Alerta";

//const MySwal = withReactContent(Swal2);

const Cambio = () => {
  const { form, cambiar } = HelperForm({});
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState(""); // Estado para almacenar el correo electrónico
  const [pass, setPass] = useState(""); //Estado para almacenar la contraseña
  const [loading, setLoading] = useState(false); // Estado para controlar la carga del envío del correo
  const [success, setSuccess] = useState(false); // Estado para controlar el éxito del envío del correo
  const [paso, setPaso] = useState("ENVIAR CORREO"); //Creo una variable para controlar en que paso va del formulario
  const [token, setTokens] = useState();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setEmail(value); // Actualizar el estado del correo electrónico
    const regex = /^[0-9\b]+$/; // Expresión regular que acepta solo números
    if (value === "" || regex.test(value)) {
      cambiar(e); // Esto es parte de tu lógica, asumo que actualiza el estado del formulario
    }
  };

  const handleButtonClick = async () => {
    if (!loading) {
      setLoading(true);
      // Simular carga y éxito después de 2 segundos
      // Aquí es donde deberías llamar a la función para enviar el correo
      // Espera a que la función termine y luego establece el estado de carga y éxito
      // Ejemplo: await enviarCorreo();
      // Después del envío del correo, puedes establecer setLoading(false) y setSuccess(true)
      // Simulación:
      if (paso === "ENVIAR CORREO") {
        setTimeout(async () => {
          await enviarCorreo();
          setLoading(false);
        }, 2000);
      } else if (paso === "ENVIAR CODIGO") {
        setTimeout(async () => {
          await verificarCodigo();
          setLoading(false);
          setTokens("");
        }, 2000);
      } else if (paso === "ACTUALIZAR CONTRASEÑA") {
        setTimeout(async () => {
          await CambiarPass();
          setLoading(false);
        }, 2000);
      }
    }
  };

  const mostrarAlerta = (mensaje, icono) => {
    setAlertSeverity(icono);
    setAlertMessage(mensaje);
    setAlertOpen(true);
  };

  const enviarCorreo = async () => {
    try {
      const dataToSend = { correo: email };
      const request = await fetch(
        "http://localhost:3600/usuarios/enviarCorreo",
        {
          method: "POST",
          body: JSON.stringify(dataToSend),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await request.json();
      if (data.id === 200) {
        let mensaje = data.mensaje;
        mostrarAlerta(mensaje, "success");
        localStorage.setItem("USU_EMAIL", email);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setPaso("ENVIAR CODIGO");
      } else {
        let mensaje = data.mensaje;
        mostrarAlerta(mensaje, "error");
      }
    } catch (error) {
      mostrarAlerta(error.message, "error");
    }
  };
  const verificarCodigo = async () => {
    try {
      const codigosIngresados = Array.from(
        document.querySelectorAll("input[type='text']")
      ).map((input) => input.value);
      const codigoFinal =
        codigosIngresados[1] +
        codigosIngresados[2] +
        codigosIngresados[3] +
        codigosIngresados[4];
      const emailLocal = localStorage.getItem("USU_EMAIL");
      //Obtengo los datos que voy a enviar por el body

      const dataToSend = { USU_EMAIL: emailLocal, USU_CODIGO: codigoFinal };
      const response = await fetch(
        `http://localhost:3600/usuarios/verificarCodigo`,
        {
          method: "POST",
          body: JSON.stringify(dataToSend),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (data.id === 200) {
        mostrarAlerta("Código validado correctamente", "success");
        localStorage.setItem("USU_CODIGO", codigoFinal);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setPaso("ACTUALIZAR CONTRASEÑA");
      } else {
        let mensaje = data.mensaje;
        mostrarAlerta(mensaje, "error");
      }
    } catch (error) {
      console.error("Error al verificar el código:", error);

      return false;
    }
  };

  const CambiarPass = async () => {
    try {
      const USU_EMAIL = localStorage.getItem("USU_EMAIL");
      const USU_CODIGO = localStorage.getItem("USU_CODIGO");
      const dataToSend = {
        USU_EMAIL: USU_EMAIL,
        USU_CODIGO: USU_CODIGO,
        USU_PASS: pass,
      };
      const request = await fetch(
        "http://localhost:3600/usuarios/actualizarPass",
        {
          method: "PUT",
          body: JSON.stringify(dataToSend),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await request.json();
      if (data.id === 200) {
        let mensaje = data.mensaje;
        mostrarAlerta(mensaje, "success");
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setPaso("ENVIAR CORREO");
        setEmail("");
        setPass("");
        localStorage.clear();
      } else {
        let mensaje = data.mensaje;
        mostrarAlerta(mensaje, "error");
      }
    } catch (error) {
      mostrarAlerta(error, "error");
    }
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      // Verificar si se ingresó un correo electrónico válido antes de continuar
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        mostrarAlerta(
          "Por favor ingrese un correo electronico válido",
          "error"
        );
        return; // Salir de la función si el correo electrónico no es válido
      }
    } else if (activeStep === 1) {
      const codigosIngresados = Array.from(
        document.querySelectorAll("input[type='text']")
      ).map((input) => input.value);
      // Realizar una solicitud al servidor para verificar si los códigos son válidos
      //console.log("CODIGO INGRESADO POR EL USUARIO", codigosIngresados);
      const codigoFinal =
        codigosIngresados[1] +
        codigosIngresados[2] +
        codigosIngresados[3] +
        codigosIngresados[4];
      console.log("CODIGO FINAL", codigoFinal);
      console.log("LARGO CODIGO FINAL", codigoFinal.length);
      // Verificar si los códigos ingresados coinciden con el campo USU_CODIGO de la base de datos
      if (codigoFinal.length !== 4) {
        mostrarAlerta("El código que ingreso no es válido", "error");

        return; // Salir de la función si el código no es válido
      }
    } else if (activeStep === 2) {
      if (pass === "" || pass.length === 0) {
        mostrarAlerta("No deje campos vacios", "error");

        return; // Salir de la función si el código no es válido
      }
    }
    // Envío del correo
    await handleButtonClick();
    // Cambiar el estado para indicar que se ha enviado el correo
    // setEmailSent(true);
    // Avanzar al siguiente paso
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const steps = [
    {
      label: "Correo donde se enviará el código",
      description: (
        <div className="field">
          <input
            type="email"
            placeholder="Correo"
            required
            id="USU_EMAIL"
            name="USU_EMAIL"
            value={email} // Asignar el valor del correo electrónico al input
            onChange={(e) => setEmail(e.target.value)} // Actualizar el estado del correo electrónico
          />
        </div>
      ),
    },
    {
      label: "Ingresa el código",
      description: (
        <>
          <div style={{ display: "flex" }}>
            <div
              className="card flex justify-content-center "
              style={{ border: "none" }}
            >
              <InputOtp
                value={token}
                onChange={(e) => setTokens(e.value)}
                integerOnly
              />
            </div>
          </div>
        </>
      ),
    },
    {
      label: "Digita la nueva contraseña",
      description: (
        <>
          <div className="field">
            <input
              type="password"
              placeholder="Contraseña"
              required
              id="USU_PASS"
              name="USU_PASS"
              value={pass} //Asigna el valor de la contraseña al input
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <form className="signup">
        <div style={{ maxWidth: 400 }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  <div style={{ marginTop: "10px" }}>
                    {index === 0 && (
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? "Finalizar" : "Continuar"}
                      </Button>
                    )}
                    {index === 1 && (
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? "Finalizar" : "Continuar"}
                      </Button>
                    )}
                    {index === 2 && (
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? "Finalizar" : "Continuar"}
                      </Button>
                    )}
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Atrás
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: green[500],
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          marginTop: "-12px",
                          marginLeft: "-12px",
                        }}
                      />
                    )}
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>
                Su contraseña ha sido actualizada correctamente
              </Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reiniciar
              </Button>
            </Paper>
          )}
        </div>
      </form>
      <Alerta
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        severity={alertSeverity}
        message={alertMessage}
      />
    </>
  );
};

export default Cambio;
