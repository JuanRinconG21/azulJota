import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';

// Estilos personalizados para la tabla
const StyledDataTable = styled(DataTable)`
  .data-table {
    font-family: Arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    overflow-x: auto; /* Hace que la tabla sea scrollable horizontalmente */
  }
  
  .data-table td, .data-table th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  
  .data-table tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  
  .data-table th {
    padding-top: 12px;
    padding-bottom: 12px;
    background-color: #4CAF50;
    color: white;
  }
`;

// Columnas de la tabla
const columns = [
  { name: 'ID', selector: 'id', sortable: true },

];

const Tablaa = () => {
  const [datos, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3600/usuarios/listar", {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      setData(data.mensaje);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  console.log("tos",datos)

  return (
    <StyledDataTable
      title="Usuarios"
      columns={columns}
      data={datos.map(user => ({
        id: user.USUARIO_ID,
      
      }))}
      pagination
      paginationPerPage={5}
      paginationRowsPerPageOptions={[5, 10, 15]}
      highlightOnHover
      striped
    />
  );
};

export default Tablaa;
