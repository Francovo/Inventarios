import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/Home/Home";
import Login from "../components/Login";
import NavBar from "../components/NavBar";
import Proveedores from "../components/Proveedores";
import { useAuth0 } from "@auth0/auth0-react";

const AppRouter = () => {
  let url = "https://datasena.herokuapp.com/";

  const { isAuthenticated } = useAuth0();

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Home url={url + "inventario/"} />} />
            <Route path="/nav" element={<NavBar />} />
            <Route
              path="/proveedores"
              element={<Proveedores url={url + "Proveedores/"} />}
            />
            <Route path="/home" element={<Home url={url + "inventario/"} />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
