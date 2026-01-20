// src/hooks/useAuthActions.ts
import { useAuth } from "react-oidc-context";

export const useAuthActions = () => {
  const auth = useAuth();

  const login = () => {
    auth.signinRedirect();
  };

  const logout = () => {
    const clientId = process.env.REACT_APP_COGNITO_CLIENT_ID;
    const logoutUri = process.env.REACT_APP_LOGOUT_REDIRECT_URI || window.location.origin;
    const cognitoDomain = process.env.REACT_APP_COGNITO_DOMAIN;

    // Cognito Hosted UI guarda tokens en sessionStorage
    sessionStorage.clear();

    // react-oidc-context cleanup
    auth.removeUser();

    // Logout del Hosted UI
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
  };

  return { login, logout };
};
