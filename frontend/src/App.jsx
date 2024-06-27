import { useState } from "react";
import Routing from "./router/Routing";
import { PrimeReactProvider } from 'primereact/api';
function App() {
  return (
    <>
    <PrimeReactProvider>
    <Routing />
    </PrimeReactProvider>
      
    </>
  );
}

export default App;
