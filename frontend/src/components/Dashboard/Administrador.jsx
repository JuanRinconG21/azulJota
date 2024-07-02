import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import HelperForm from "../../helper/HelperForm";
import "../../assets/style.css";
import EditarUser from "./EditarUsuario";
import UseAuth from "../../helper/UseAuth";
const MySwal = withReactContent(Swal2);
import { Navigate } from "react-router-dom";
import Table from "react-bootstrap/Table";

////////////////tabla///////////////////

const Administrador = (props) => {
  const { Autenticado } = UseAuth();
  const [datos, Setdatos] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const { form, cambiar } = HelperForm({});
  const token = localStorage.getItem("token");
  const [Editar, setEditar] = useState(null);
  const [nit, setNit] = useState("");
  const [tele, setTele] = useState("");

  const handleTeleChange = (event) => {
    const teleValue = event.target.value.replace(/\D/g, "");
    setTele(teleValue);
  };

  const AgregarUsuario = async (e) => {
    e.preventDefault();
    let nit = document.querySelector("#EMPRESA_ID");
    let nombre = document.querySelector("#USU_NOMBRE");
    let apellido = document.querySelector("#USU_APELLIDO");
    let celular = document.querySelector("#USU_TELEFONO");
    let usuario = document.querySelector("#USU_USUARIO");
    let email = document.querySelector("#USU_EMAIL");
    let pass = document.querySelector("#USU_PASS");
    let estado = document.querySelector("#USU_ESTADO");
    let rol = document.querySelector("#USU_ROL");
    let imagen = document.querySelector("#USU_IMAGEN");
    if (
      nit.value.length > 0 &&
      nombre.value.length > 0 &&
      apellido.value.length > 0 &&
      celular.value.length > 0 &&
      usuario.value.length > 0 &&
      email.value.length > 0 &&
      pass.value.length > 0 &&
      estado.value.length > 0 &&
      rol.value.length > 0 &&
      imagen.files[0] !== undefined
    ) {
      const formData = new FormData();
      formData.append("EMPRESA_ID", nit.value);
      formData.append("USU_NOMBRE", nombre.value);
      formData.append("USU_APELLIDO", apellido.value);
      formData.append("USU_TELEFONO", celular.value);
      formData.append("USU_USUARIO", usuario.value);
      formData.append("USU_EMAIL", email.value);
      formData.append("USU_PASS", pass.value);
      formData.append("USU_ROL", rol.value);
      formData.append("USU_ESTADO", estado.value);
      formData.append("USU_IMAGEN", imagen.files[0]);
      fetch("http://localhost:3600/usuarios/agregar", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `${token}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          if (res.id == 200) {
            MySwal.fire({
              title: <strong> {"Agregado"}</strong>,
              html: <i>{res.mensaje}</i>,
              icon: "success",
            });
            nit.value = "";
            nombre.value = "";
            apellido.value = "";
            celular.value = "";
            usuario.value = "";
            email.value = "";
            pass.value = "";
            rol.value = "";
            estado.value = "";
            imagen.value.files[0] = "";
          } else {
            MySwal.fire({
              title: <strong> {"Error"}</strong>,
              html: <i>{res.mensaje}</i>,
              icon: "error",
            });
          }
        });
    } else {
      MySwal.fire({
        title: <strong> {"Error"}</strong>,
        html: <i>{"Hay campos vacíos"}</i>,
        icon: "error",
      });
    }
  };

  const ListarUsuarios = async () => {
    const request = await fetch("http://localhost:3600/usuarios/listar", {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    });
    const data = await request.json();
    Setdatos(data.mensaje);
  };

  const ListarEmpresas = async () => {
    const request = await fetch("http://localhost:3600/empresas/listar", {
      method: "GET",
    });
    const data = await request.json();
    setEmpresas(data.mensaje);
  };

  const ActivarUsuario = async (id) => {
    const request = await fetch(
      `http://localhost:3600/usuarios/activarUser/${id}`,
      {
        method: "PUT",
      }
    );
    const data = await request.json();
    alert(data.mensaje);
  };

  const DesactivarUsuario = async (id) => {
    const request = await fetch(
      `http://localhost:3600/usuarios/desactivarUser/${id}`,
      {
        method: "PUT",
      }
    );
    const data = await request.json();
    alert(data.mensaje);
  };

  const CambiarEstado = async (estado, id) => {
    if (estado === true) {
      await DesactivarUsuario(id);
    } else {
      await ActivarUsuario(id);
    }
    ListarUsuarios();
  };

  useEffect(() => {
    ListarUsuarios();
    ListarEmpresas();
  }, []);
  // const Agregar = (id) => {
  //   MySwal.fire({
  //     title: `¿Deseas confirmar el pedidio #${id}?`,
  //     showDenyButton: true,
  //     confirmButtonText: "Sí",
  //     denyButtonText: `No`,
  //   }).then((result) => {
  //     /* Read more about isConfirmed, isDenied below */
  //     if (result.isConfirmed) {
  //       fetch(`http://localhost:3600/encabezado/editarEstado/${id}`, {
  //         method: "PUT", // Método de solicitud (puede ser GET, POST, etc.)
  //         headers: {
  //           Authorization: `${token}`, // Incluye el token JWT en el encabezado Authorization
  //         },
  //       })
  //         .then((response) => {
  //           return response.json();
  //         })
  //         .then((data) => {
  //           if (data.id == 200) {
  //             MySwal.fire({
  //               title: <strong>Felicitaciones</strong>,
  //               html: <i>El pedido a sido confirmado con exito</i>,
  //               icon: "success",
  //             });
  //             Listar();
  //           }
  //         });
  //     }
  //   });
  // };

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => {
    setShow2(false);
  };
  const handleShow2 = () => {
    setShow2(true);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const renderRol = (rol) => {
    return rol === 1 ? "Empresa" : "Admin";
  };

  const renderEstado = (estado) => {
    return estado === false ? "Inactivo" : "Activo";
  };

  return (
    <>
      {Autenticado.USU_ROL === true ? (
        <>
          {" "}
          <div className="container-fluid">
            <main className="main users chart-page" id="skip-target">
              <Modal
                show={show2}
                onHide={handleClose2}
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Agregar usuario
                  </Modal.Title>
                </Modal.Header>
                <form onSubmit={AgregarUsuario}>
                  <Modal.Body>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control border-secondary"
                        placeholder="Usuario"
                        required
                        id="USU_USUARIO"
                        name="USU_USUARIO"
                        onChange={cambiar}
                      />
                      <label htmlFor="floatingInput">Usuario</label>
                    </div>
                    <div className="form-floating mb-3">
                      <select
                        id="EMPRESA_ID"
                        name="EMPRESA_ID"
                        className="form-control border-secondary"
                        required
                      >
                        <option value="" selected disabled>
                          Selecciona una Empresa
                        </option>
                        {empresas.map((empresa) => {
                          return (
                            <option
                              key={empresa.EMPRESA_ID}
                              value={empresa.EMPRESA_ID}
                            >
                              {empresa.EMP_RAZON_SOCIAL}
                            </option>
                          );
                        })}
                      </select>

                      <label htmlFor="floatingInput">Nit Empresa</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control border-secondary"
                        placeholder="Nombre"
                        required
                        id="USU_NOMBRE"
                        name="USU_NOMBRE"
                        onChange={cambiar}
                      />
                      <label htmlFor="floatingInput">Nombre</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control border-secondary"
                        placeholder="Apellido"
                        required
                        id="USU_APELLIDO"
                        name="USU_APELLIDO"
                        onChange={cambiar}
                      />
                      <label htmlFor="floatingInput">Apellido</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control border-secondary"
                        placeholder="Telefono"
                        required
                        id="USU_TELEFONO"
                        name="USU_TELEFONO"
                        onChange={(e) => {
                          handleTeleChange(e);
                          cambiar(e);
                        }}
                        value={tele}
                      />
                      <label htmlFor="floatingInput">Telefono</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control border-secondary"
                        placeholder="Correo Electrónico"
                        required
                        id="USU_EMAIL"
                        name="USU_EMAIL"
                        onChange={cambiar}
                      />
                      <label htmlFor="floatingInput">Correo Electrónico</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        className="form-control border-secondary"
                        placeholder="Contraseña"
                        required
                        id="USU_PASS"
                        name="USU_PASS"
                        onChange={cambiar}
                      />
                      <label htmlFor="floatingInput">Contraseña</label>
                    </div>
                    <div className="form-floating mb-3">
                      <select
                        type="text"
                        className="form-control border-secondary"
                        placeholder="Rol"
                        required
                        id="USU_ROL"
                        name="USU_ROL"
                        onChange={cambiar}
                      >
                        <option selected disabled>
                          Selecciona un rol
                        </option>
                        <option value="true">Admin</option>
                        <option value="False">Empresa</option>
                      </select>
                      <label htmlFor="floatingInput">Rol</label>
                    </div>{" "}
                    <div className="form-floating mb-3">
                      <select
                        type="text"
                        className="form-control border-secondary"
                        placeholder="Estado"
                        required
                        id="USU_ESTADO"
                        name="USU_ESTADO"
                        onChange={cambiar}
                      >
                        <option selected disabled>
                          Selecciona un estado
                        </option>
                        <option value="true">Activo</option>
                        <option value="false">Inactivo</option>
                      </select>
                      <label htmlFor="floatingInput">Estado</label>
                    </div>{" "}
                    <div className="form-floating mb-3">
                      <input
                        type="file"
                        className="form-control border-secondary"
                        placeholder="Imagen"
                        required
                        id="USU_IMAGEN"
                        name="USU_IMAGEN"
                        onChange={cambiar}
                      />
                      <label htmlFor="floatingInput">Imagen</label>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <button className=" btn-gradient" type="submit">
                      <i className="fa-solid fa-floppy-disk"></i> Agregar
                    </button>
                  </Modal.Footer>
                </form>
              </Modal>
              <div className="container">
                <h2 className="main-title text-center">Usuarios</h2>
                <div className="col-12 text-end">
                  <button onClick={handleShow2} className=" btn-gradient">
                    <i className="bi bi-person-add"></i> Agregar Usuarios
                  </button>
                  <div className="row stat-cards mt-4">
                    <div className="col-md-6 col-xl-12">
                      <Table responsive="md">
                        <thead>
                          <tr style={{ fontSize: "86%", textAlign: "center" }}>
                            <th>NITEMPRESA</th>
                            <th>LOGO</th>
                            <th>USUARIO</th>
                            <th>NOMBRE</th>
                            <th>APELLIDO</th>
                            <th>TELEFONO</th>
                            <th>CORREO</th>
                            <th>ROL</th>
                            <th>ESTADO</th>
                            <th>EDITAR</th>
                            <th>ESTADO</th>
                          </tr>
                        </thead>
                        <tbody style={{ textAlign: "center" }}>
                          {datos.map((usuario) => {
                            return (
                              <tr
                                key={usuario.USUARIO_ID}
                                style={{ fontSize: "80%" }}
                              >
                                <td>{usuario.EMP_TERCERO}</td>
                                <td>
                                  {" "}
                                  <img
                                    src={usuario.USU_IMAGEN}
                                    alt=""
                                    style={{ width: "2.3rem" }}
                                  />
                                </td>
                                <td id="td">{usuario.USU_USUARIO}</td>
                                <td id="td">{usuario.USU_NOMBRE}</td>
                                <td id="td">{usuario.USU_APELLIDO}</td>
                                <td id="td">{usuario.USU_TELEFONO}</td>
                                <td id="td">{usuario.USU_EMAIL}</td>
                                <td id="td">{renderRol(usuario.USU_ROL)}</td>
                                {usuario.USU_ESTADO === true ? (
                                  <td
                                    id="td"
                                    style={{
                                      fontWeight: "bold",
                                      color: "#0eba02",
                                    }}
                                  >
                                    {renderEstado(usuario.USU_ESTADO)}
                                  </td>
                                ) : (
                                  <td
                                    id="td"
                                    style={{ fontWeight: "bold", color: "red" }}
                                  >
                                    {renderEstado(usuario.USU_ESTADO)}
                                  </td>
                                )}

                                <td id="th">
                                  <a
                                    onClick={() => {
                                      setEditar(usuario.USUARIO_ID);
                                      handleShow();
                                    }}
                                    className="btn btn-app btn-gradient2"
                                  >
                                    <i className="bi bi-pencil-square"></i>
                                  </a>
                                </td>
                                {Editar == usuario.USUARIO_ID && (
                                  <EditarUser
                                    props={props}
                                    show={show}
                                    handleClose={handleClose}
                                    idUsuario={usuario.USUARIO_ID}
                                    nombre={usuario.USU_NOMBRE}
                                    apellido={usuario.USU_APELLIDO}
                                    telefono={usuario.USU_TELEFONO}
                                    idEmpresa={usuario.EMPRESA_ID}
                                    email={usuario.USU_EMAIL}
                                    usuario={usuario.USU_USUARIO}
                                    setEditar={setEditar}
                                    Listar={ListarUsuarios}
                                  ></EditarUser>
                                )}
                                <td>
                                  {usuario.USU_ESTADO === true ? (
                                    <button
                                      className="btn btn-app btn-gradient3"
                                      style={{ backgroundColor: "red" }}
                                      onClick={() => {
                                        CambiarEstado(
                                          usuario.USU_ESTADO,
                                          usuario.USUARIO_ID
                                        );
                                      }}
                                    >
                                      {" "}
                                      <i className="bi bi-dash"></i>
                                    </button>
                                  ) : (
                                    <button
                                      className="btn btn-app btn-gradient4"
                                      style={{ backgroundColor: "green" }}
                                      onClick={() => {
                                        CambiarEstado(
                                          usuario.USU_ESTADO,
                                          usuario.USUARIO_ID
                                        );
                                      }}
                                    >
                                      {" "}
                                      <i className="bi bi-check"></i>{" "}
                                    </button>
                                  )}
                                </td>

                                {/* <td id="th">
                          {" "}
                          <a
                            onClick={() => {
                              Eliminar(
                                empleado.idEmpleado,
                                empleado.nombre + " " + empleado.apellido
                              );
                            }}
                            className="btn btn-app btn-gradient"
                          >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                          </a>
                        </td> */}
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </>
      ) : (
        //luego le cambia la ruta
        <Navigate to={"/Dashboard"} />
      )}
    </>
  );
};

export default Administrador;
