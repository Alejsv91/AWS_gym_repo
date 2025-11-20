// App.js

import { useAuth } from "react-oidc-context";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  const auth = useAuth();

  console.log("Client ID:", process.env.REACT_APP_COGNITO_CLIENT_ID);
  console.log("User Pool ID:", process.env.REACT_APP_COGNITO_USER_POOL_ID);

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

  if (auth.isAuthenticated) {
    return (

      <><Navbar /><Router>
        <Routes>
          {auth.isAuthenticated ? (
            <Route path="/landing" element={<LandingPage />} />
          ) : (
            <Route
              path="*"
              element={<div className="container mt-5">
                <h1>Please log in</h1>
                <button
                  className="btn btn-primary"
                  onClick={() => auth.signinRedirect()}
                >
                  Login
                </button>
              </div>} />
          )}
          {/* Redirect to landing page after login */}
          {auth.isAuthenticated && (

            <Route path="*" element={<Navigate to="/landing" />} />
          )}
        </Routes>
      </Router></>
    );
  }

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
}

export default App;
