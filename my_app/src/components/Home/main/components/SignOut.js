import { Link, Navigate, useNavigate } from "react-router-dom"
import useAuth from "../../../../utils/hooks/useAuth";
import "./style/signOut.css"


const SignOut = () => {

    const { signOut } = useAuth();
    const navigate = useNavigate();

    const signOutHandler = (event) => {
        event.preventDefault();
        console.log("signout");
        signOut(() => navigate("/login", { replace: true }));
    }

    const user = useAuth().user;


    return <>
        <div className="userName">User name:<br />{user.userName}</div>
        <button className="signOutButton" onClick={signOutHandler}>выйти из аккаунта</button>
    </>
}

export default SignOut;