import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const Ubicacion = () => {
  const ubi = useLocation();

  useEffect(() => {
    localStorage.setItem("lastLocation", ubi.pathname);
  }, [ubi]);

  useEffect(() => {
    const lastLocation = localStorage.getItem("lastLocation");
    if (lastLocation) window.scrollTo(0, 0);
  }, []);
  return <></>;
};

export default Ubicacion;
