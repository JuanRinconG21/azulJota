import React from 'react'
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert"

const Alerta = ({open, onClose, severity, message}) => {
    const handleClose = (event, reason) =>{
        if (reason === 'clickaway'){
            return;
        }

        onClose(false);
    }
    return ( <>
    <Snackbar   anchorOrigin={{ vertical: "center", horizontal: "center" }}  style={{
        top: "50%", // Ajusta el 50% verticalmente
       
      }} open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} variant="filled" sx= {{width: '100%'}}>
            {message}
        </Alert>
    </Snackbar>
    </> );
}
 
export default Alerta;