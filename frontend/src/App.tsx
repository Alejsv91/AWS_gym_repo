// App.js
import { useAuth } from "react-oidc-context";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPages";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { ROUTES } from "./constants/Routes";

function App() {
  const auth = useAuth();

  //SCRUM-28
  const signOutRedirect = () => {
    const clientId = process.env.REACT_APP_COGNITO_CLIENT_ID;
    const logoutUri = "<logout uri>";
    const cognitoDomain = process.env.REACT_APP_COGNITO_USER_POOL_ID;
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
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
            {ROUTES.map(route => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </>
        ) : (
          <Route
            path="*"
            element={
              <div className="container mt-5">
                <h1>Please log in</h1>
                <button
                  className="btn btn-primary"
                  onClick={() => auth.signinRedirect()}
                >
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
