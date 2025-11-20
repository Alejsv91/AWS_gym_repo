import { useAuth } from "react-oidc-context";

const LandingPage = () => {
    const auth = useAuth();

    return (
        <div className="container mt-5">
            <h1>Welcome, {auth.user?.profile.email}!</h1>
            <p>You are successfully logged in.</p>
            <button className="btn btn-danger" onClick={() => auth.removeUser}>
                Logout
            </button>
        </div>
    );
};

export default LandingPage;