// App.js
import { useAuth } from "react-oidc-context";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPages";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { ROUTES } from "./constants/Routes";
import { useAuthActions } from "./utils/auth";
import LoadingModal from "./components/Loading";
import { useState, useEffect } from "react";

function App() {
  const auth = useAuth();
  const { login } = useAuthActions();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(auth.isLoading);
  }, [auth.isLoading]);

  if (auth.isLoading) {
    return <LoadingModal isLoading={isLoading} />;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {auth.isAuthenticated ? (
          <>
            <Route path="/landing" element={<LandingPage />} />
            {/* Redirect to landing page after login */}
            <Route path="*" element={<Navigate to="/landing" />} />
            {ROUTES.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </>
        ) : (
          <Route
            path="*"
            element={
              <div className="container mt-5">
                <h1>Please log in</h1>
                <button className="btn btn-primary" onClick={login}>
                  Login
                </button>
              </div>
            }
          />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
