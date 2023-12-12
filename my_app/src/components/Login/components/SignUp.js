import { useState } from "react"
import "./style/signUp.css"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../../../utils/hooks/useAuth"
import hmacSHA384 from "crypto-js/hmac-sha384"
import CryptoJS from "crypto-js"
import axios from 'axios'


const SignUp = (props) => {



    const [userName, setUserName] = useState("")
    const [userPass, setUserPass] = useState("")
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const poorPass = "СЛИШКОМ СЛАБО!\nПароль должен быть не менее 8 символов и содержать:\n\n\tПрописные (заглавные) буквы латинского (A-Z) и русского (А-Я) алфавитов\n\tСтрочные буквы латинского (a-z) и русского (а-я) алфавитов\n\tАрабские цифры (0-9)\n\tСпециальные символы – @#$_"

    const changeNameHandler = (event) => {
        setUserName(event.target.value);
    }

    const changePasswordHandler = (event) => {
        setUserPass(event.target.value);
    }

    const checkInputName = (strToCheck) => {
        const regex = new RegExp("(_{1,2})?[a-zA-Z0-9]{2,}(_{1,2})?")
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
                // axios.interceptors.request.use(function (request) {
                //     console.log(request)
                //     return request;
                // })
                // axios.interceptors.response.use(function (response) {
                //     console.log(response)
                //     return response;
                // })
                axios(
                    {
                        method: 'post',
                        url: `http://localhost:5290/reg/init?login=${userName}`,
                        headers: { "Content-Type": "text/plain" },
                        withCredentials: true,
                    }
                )
                    .then(response => {
                        if (response.status === 201) {
                            axios({
                                method: 'post',
                                url: `http://localhost:5290/reg/confirm`,
                                headers: { "Content-Type": "application/json" },
                                withCredentials: true,
                                data: JSON.stringify({
                                    "login": userName,
                                    "password": hmacSHA384(userPass, CryptoJS.SHA384(response.data)).toString()
                                })
                            })
                                .then(response => {
                                    alert("Вы зарегались, теперь вы раб системы")
                                })

                        }
                    }
                    )
            }
        }
    }

    return <>
        <div className="signUpContainer">
            <h1 className="containerName">ЗАРЕГИСТРИРУЙСЯ</h1>
            <label className="labelInput login">Логин:</label>
            <input className="loginInput user" type="text" value={userName} onChange={changeNameHandler}></input>
            <label className="labelInput password">Пароль:</label>
            <input className="loginInput pass" type="password" onChange={changePasswordHandler}></input>
            <Link to="/" >
                <button className="loginButton" onClick={requestDB}>Зарегистрироваться</button>
            </Link>
        </div>
    </>
}
export default SignUp;