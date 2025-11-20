// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  client_id: process.env.REACT_APP_COGNITO_CLIENT_ID,
  redirect_uri: "http://localhost:3000",
  response_type: "code",
  scope: "email openid phone",
};

const root = ReactDOM.createRoot(
  document.getElementById("root")!   // 👈 asegura que no es null
);

// wrap the application with AuthProvider
root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);