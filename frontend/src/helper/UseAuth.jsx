import React from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthProvide";

const UseAuth = () => {
  return useContext(AuthContext);
};

export default UseAuth;