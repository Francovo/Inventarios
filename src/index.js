import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

import AppRouter from "./routes/AppRouter";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-bzpnvlpy.us.auth0.com"
    clientId="omxZ8f6auDAKpyF3RVduRG8qvuuO9peV"
    redirectUri={window.location.origin}
  >
    <ChakraProvider resetCSS>
      <AppRouter />
    </ChakraProvider>
  </Auth0Provider>
);
