import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"


const PrivateRoute = ({ children }) => {

    const user = useAuth().user;
    if (!user.auth) {

        return <Navigate to="/login" />;
    }

    return children;
};
export default PrivateRoute;