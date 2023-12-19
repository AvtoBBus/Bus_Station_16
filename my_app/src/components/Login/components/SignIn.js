import "./style/signIn.css"
import useAuth from "../../../utils/hooks/useAuth"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import hmacSHA384 from "crypto-js/hmac-sha384"
import CryptoJS from "crypto-js"
import axios from 'axios'

const SignIn = (props) => {

    const [userName, setUserName] = useState("")
    const [userPass, setUserPass] = useState("")
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const changeNameHandler = (event) => {
        setUserName(event.target.value);
    }

    const changePasswordHandler = (event) => {
        setUserPass(event.target.value);
    }

    const checkInputName = (strToCheck) => {
        const regex = new RegExp("(_{1,2})?[a-zA-Z0-9]{2,}(_{1,2})?");
        if (strToCheck.match(regex) === null) {
            return false
        }
        return true
    }

    const checkPass = (strToCheck) => {
        const regexLittle = new RegExp("[a-z]{3,}");
        const regexHigh = new RegExp("[A-Z]{1,}");
        const regexNum = new RegExp("[0-9]{3,}")
        if (strToCheck.match(regexLittle) === null || strToCheck.match(regexHigh) === null || strToCheck.match(regexNum) === null) {
            return false;
        }
        return true;
    }

    const requestDB = (event) => {
        event.preventDefault();
        console.log("signup");
        if (checkInputName(userName)) {
            if (checkPass(userPass)) {
                // axios.interceptors.response.use(function (response) {
                //     return response;
                // })
                axios.post(`http://localhost:5290/auth/login/init?login=${userName}`)
                    .then(response => {
                        if (response.status === 200) {
                            axios({
                                method: 'post',
                                url: `http://localhost:5290/auth/login/confirm`,
                                headers: { "Content-Type": "application/json" },
                                withCredentials: true,
                                data: JSON.stringify({
                                    "login": userName,
                                    "password": hmacSHA384(userPass, CryptoJS.SHA384(response.data.salt)).toString()
                                })
                            })
                                .then(function (response) {
                                    if (response.status === 200) {
                                        axios.get(`http://localhost:5290/userData/getAll`, { withCredentials: true })
                                            .then(response => {
                                                if (response.status === 200) {
                                                    console.log(response.data);
                                                    props.startReqDB(response.data)
                                                    signIn({ userName: userName, auth: true }, () => navigate("/", { replace: true }));
                                                }
                                            })
                                            .catch(er => console.log(er))
                                    }
                                }
                                )
                        }
                    }
                    )
            }
        }
    }

    // console.log("$2a$11$0EueAhdK1uIiN8BgiAHvv." + hmacSHA384("Test123", CryptoJS.PBKDF2("Test123", "$2a$11$0EueAhdK1uIiN8BgiAHvv.")))

    return <>
        <div className="signInContainer">
            <h1 className="containerName signIN">АВТОРИЗИРУЙСЯ</h1>
            <label className="labelInput loginSignIN">Логин:</label>
            <input className="loginInput userSignIN" type="text" value={userName} onChange={changeNameHandler}></input>
            <label className="labelInput passwordSignIN">Пароль:</label>
            <input className="loginInput passSignIN" type="password" onChange={changePasswordHandler}></input>
            <Link to="/">
                <button className="loginButtonSignIN" onClick={requestDB}>Войти</button>
            </Link>
        </div>
    </>
}

export default SignIn;