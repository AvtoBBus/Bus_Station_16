import { useState } from "react"
import "./style/signUp.css"
import { Link, Navigate, useNavigate } from "react-router-dom"
import useAuth from "../../../utils/hooks/useAuth"



const SignUp = (props) => {

    const [userName, setUserName] = useState("")
    const { signIn } = useAuth();
    const [startReqDB, setStartReqDB] = useState(false)
    const navigate = useNavigate();

    const changeNameHandler = (event) => {
        setUserName(event.target.value);
    }



    const requestDB = (event) => {
        event.preventDefault();
        console.log("signup");

        fetch('https://localhost:7215/testController/testEndpoint') // Replace with your API endpoint
            .then(response => {
                if (response.ok) {
                    signIn({ userName: userName, auth: true }, () => navigate("/", { replace: true }));
                }
            })
            .catch(error => {
                console.log(error.message);
            });


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