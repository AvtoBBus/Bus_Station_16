import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"

// export const authLoader = async ({ request, params }) => {

//     const URL = "http://localhost:5290/reg/login";
//     console.log("here")
//     const canAuth = fetch(URL, {
//         method: 'POST',
//         // body: userName,
//     }).then((response) => {
//         console.log(response);
//         return response;
//     }).catch(() => {
//         console.log("no");
//     });
//     return canAuth;
// }

const PrivateRoute = ({ children }) => {

    const user = useAuth().user;
    console.log(user);
    if (!user.auth) {

        return <Navigate to="/login" />;
    }

    return children;
};
export default PrivateRoute;