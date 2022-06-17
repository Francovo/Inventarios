import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Proveedores from "../components/Proveedores";
import { useAuth0 } from "@auth0/auth0-react";
import Nominas from "../components/Nominas";
import Home from "../components/Home";
import NavBar from "../components/NavBar/NavBar";

const AppRouter = () => {
  let url = "https://datasena.herokuapp.com/";

  const { isAuthenticated } = useAuth0();

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home url={url + "inventario/"} />} />
            <Route
              path="/proveedores"
              element={<Proveedores url={url + "Proveedores/"} />}
            />
            <Route path="/home" element={<Home url={url + "inventario/"} />} />
            <Route
              path="/nominas"
              element={<Nominas url={url + "Nominas/"} />}
            />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default AppRouter;
