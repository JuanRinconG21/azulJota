import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

//Login y Registro
//import "./assets/style.css";

//Dashboard
import "./assets/css/style.min.css";
import "./assets/plugins/chart.min.js";
import "./assets/plugins/feather.min.js";
import "./assets/js/script.js";


import "bootstrap/dist/js/bootstrap.bundle.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
