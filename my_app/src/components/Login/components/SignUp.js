import { useState } from "react"
import "./style/signUp.css"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../../../utils/hooks/useAuth"
import hmacSHA384 from "crypto-js/hmac-sha384"
import CryptoJS from "crypto-js"


const SignUp = (props) => {



    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
    // headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    // headers.append('Access-Control-Allow-Credentials', 'true');


    // headers.append('GET', 'POST', 'OPTIONS');



    const [userName, setUserName] = useState("")
    const [userPass, setUserPass] = useState("")
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const poorPass = "СЛИШКОМ СЛАБО!\nПароль должен быть не менее 8 символов и содержать:\n\n\tПрописные (заглавные) буквы латинского (A-Z) и русского (А-Я) алфавитов\n\tСтрочные буквы латинского (a-z) и русского (а-я) алфавитов\n\tАрабские цифры (0-9)\n\tСпециальные символы – @#$_"

    const changeNameHandler = (event) => {
        setUserName(event.target.value);
    }

<<<<<<< Updated upstream
    const requestDB = (event) => {
        event.preventDefault();
        console.log("signup");
        if (userName.length) {
            signIn({ userName: userName, auth: true }, () => navigate("/", { replace: true }));
=======
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
        if (strToCheck.length < 8) {
            return false;
        }
        const regexLittle = new RegExp("[a-z]{1,}");
        const regexHigh = new RegExp("[A-Z]{1,}");
        const regexLLittle = new RegExp("[а-я]{1,}");
        const regexLHigh = new RegExp("[А-Я]{1,}");
        const regexNum = new RegExp("[0-9]{1,}");
        const regexSimbol = new RegExp("[@#$_,.|]{1,}")
        if (
            (strToCheck.match(regexLittle) !== null || strToCheck.match(regexLLittle) !== null) &&
            (strToCheck.match(regexHigh) !== null || strToCheck.match(regexLHigh) !== null) &&
            strToCheck.match(regexNum) !== null &&
            strToCheck.match(regexSimbol)
        ) {
            return true;
        }
        return false;
    }

    const requestDB = (event) => {
        event.preventDefault();
        // console.log(JSON.stringify({ userName }));

        if (checkInputName(userName)) {
            if (checkPass(userPass)) {
                fetch(`https://localhost:7215/registration/reg/init?login=${userName}`, {
                    method: "POST"
                })
                    .then(response => {
                        if (response.ok) {

                            response.json().then((res) => {
                                fetch(`https://localhost:7215/registration/reg/confirm`, {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                        "login": userName,
                                        "password": res.salt + hmacSHA384(userPass, CryptoJS.PBKDF2(userPass, res.salt))
                                    })
                                })
                                    .then(response => console.log(response))
                            });
                            signIn({ userName: userName, auth: true }, () => navigate("/", { replace: true }));
                        }
                    })
                    .catch(error => {
                        console.log(error.message);
                    });

                // signIn({ userName: userName, auth: true }, () => navigate("/", { replace: true }));
            }
            else {
                alert(poorPass);
            }
        }
        else {
            alert("Недопустимое имя пользователя!\nПример имён: Name, _name_, __NAME__")
>>>>>>> Stashed changes
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