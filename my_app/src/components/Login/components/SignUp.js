import { useState } from "react"
import "./style/signUp.css"
import { Link, Navigate, useNavigate } from "react-router-dom"
import useAuth from "../../../utils/hooks/useAuth"



const SignUp = (props) => {



    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
    // headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    // headers.append('Access-Control-Allow-Credentials', 'true');


    // headers.append('GET', 'POST', 'OPTIONS');



    const [userName, setUserName] = useState("")
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const changeNameHandler = (event) => {
        setUserName(event.target.value);
    }

    const requestDB = (event) => {
        event.preventDefault();
        console.log("signup");
        if (userName.length) {
            signIn({ userName: userName, auth: true }, () => navigate("/", { replace: true }));
        }
    }

    return <>
        <div className="signUpContainer">
            <h1 className="containerName">ЗАРЕГИСТРИРУЙСЯ</h1>
            <label className="labelInput login">Логин:</label>
            <input className="loginInput user" type="text" value={userName} onChange={changeNameHandler}></input>
            <label className="labelInput password">Пароль:</label>
            <input className="loginInput pass" type="password"></input>
            <Link to="/" >
                <button className="loginButton" onClick={requestDB}>Зарегистрироваться</button>
            </Link>
        </div>
    </>
}

export default SignUp;