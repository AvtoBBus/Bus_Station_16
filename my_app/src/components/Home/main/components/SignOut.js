import { Link, Navigate, useNavigate } from "react-router-dom"
import useAuth from "../../../../utils/hooks/useAuth";
import axios from "axios";
import "./style/signOut.css"


const SignOut = (props) => {

    const { signOut } = useAuth();
    const navigate = useNavigate();

    const signOutHandler = (event) => {
        event.preventDefault();
        console.log("signout");
        axios(`http://localhost:5290/auth/logout`, {
            method: "POST",
        })
            .then(response => {
                if (response.status === 200) {
                    console.log(response);
                    signOut(() => {
                        props.clearList();
                        navigate("/login", { replace: true });
                    });
                }
            })
            .catch(er => {
                alert(`Ошибка!\n${er}`)
            })
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