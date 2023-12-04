import { Link, Navigate, useNavigate } from "react-router-dom"
import useAuth from "../../../../utils/hooks/useAuth";
import "./style/signOut.css"


const SignOut = () => {

    const { signOut } = useAuth();
    const navigate = useNavigate();

    const signOutHandler = (event) => {
        event.preventDefault();
        console.log("signout");
        fetch(`https://localhost:7215/authentication/logout`, {
            method: "POST",
        })
            .then(response => console.log(response))
        signOut(() => navigate("/login", { replace: true }));
    }

    const user = useAuth().user;

    const convertStr = (str) => {
        if (typeof str !== "undefined")
            return str.length >= 7 ? str.slice(0, 6) + "..." : str;
    }

    return <>
        <div className="signOutContainer">
            <div className="userName">User name</div>
            <div className="userName Name">{convertStr(user.userName)}</div>
            <button className="signOutButton" onClick={signOutHandler}>выйти из аккаунта</button>
        </div>
    </>
}

export default SignOut;