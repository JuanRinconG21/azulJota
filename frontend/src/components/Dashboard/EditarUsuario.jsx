import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import HelperForm from "../../helper/HelperForm";
import Swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Swal = withReactContent(Swal2);

const EditarUser = ({
  props,
  show,
  handleClose,
  idUsuario,
  idEmpresa,
  nombre,
  apellido,
  telefono,
  usuario,
  email,
  setEditar,
  Listar,
}) => {
  const { form, cambiar } = HelperForm({});
  const token = localStorage.getItem("token");
  const [pass, setPass] = useState("");
  const Pass = async (id) => {
    const request = await fetch(
      `http://localhost:3600/usuarios/desencriptarPass/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const data = await request.json();
    console.log("LA PASSSSSS", data.mensaje);
    setPass(data.mensaje);
  };

  const EditarEmple = async (e) => {
    const usuario = document.querySelector("#USU_USUARIO");
    const nombre = document.querySelector("#USU_NOMBRE");
    const apellido = document.querySelector("#USU_APELLIDO");
    const celular = document.querySelector("#USU_TELEFONO");
    const nit = document.querySelector("EMPRESA_ID");
    const email = document.querySelector("#USU_EMAIL");
    const pass = document.querySelector("#USU_PASS");
    e.preventDefault();
    let formulario = form;
    const request = await fetch(
      `http://localhost:3600/usuarios/editar/${idUsuario}`,
      {
        method: "PUT",
        body: JSON.stringify(formulario),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    const data = await request.json();
    if (data.id == 200) {
      let mensaje = data.mensaje;
      Swal.fire({
        title: <strong> {"Editado"}</strong>,
        html: <i>{mensaje}</i>,
        icon: "success",
      });
      setEditar(0);
      Listar();
    } else {
      let mensaje = data.mensaje;
      Swal.fire({
        title: <strong> {"Error"}</strong>,
        html: <i>{mensaje}</i>,
        icon: "error",
      });
      nombre.value = "";
      apellido.value = "";
      celular.value = "";
      usuario.value = "";
      email.value = "";
      pass.value = "";
      nit.value = "";
    }
  };
  useEffect(() => {
    Pass(idUsuario);
  }, []);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton id="gradient">
          <Modal.Title id="contained-modal-title-vcenter">
            Editar Usuario
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={EditarEmple}>
          <Modal.Body>
            <div className="mb-2">
              <label className="form-label">Usuario</label>
              <input
                type="text"
                className="form-control border-secondary"
                id="USU_USUARIO"
                name="USU_USUARIO"
                onChange={cambiar}
                defaultValue={usuario}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Nit Empresa</label>
              <input
                type="number"
                className="form-control border-secondary"
                id="EMPRESA_ID"
                name="EMPRESA_ID"
                onChange={cambiar}
                defaultValue={idEmpresa}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Nombre/s</label>
              <input
                type="text"
                className="form-control border-secondary"
                id="USU_NOMBRE"
                name="USU_NOMBRE"
                onChange={cambiar}
                defaultValue={nombre}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Apellido/s</label>
              <input
                type="text"
                className="form-control border-secondary"
                id="USU_APELLIDO"
                name="USU_APELLIDO"
                onChange={cambiar}
                defaultValue={apellido}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Telefono</label>
              <input
                type="number"
                className="form-control border-secondary"
                id="USU_TELEFONO"
                name="USU_TELEFONO"
                onChange={cambiar}
                defaultValue={telefono}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Correo electronico</label>
              <input
                type="email"
                className="form-control border-secondary"
                id="USU_EMAIL"
                name="USU_EMAIL"
                onChange={cambiar}
                defaultValue={email}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control border-secondary"
                id="USU_PASS"
                name="USU_PASS"
                value={pass}
                onChange={cambiar}
                required
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className=" btn-gradient">
              <i className="fas fa-edit"></i> Editar
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default EditarUser;
