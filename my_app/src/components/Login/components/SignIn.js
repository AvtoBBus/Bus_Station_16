import "./style/signIn.css"

const SignIn = () => {
    return <>
        <div className="signInContainer">
            <h1 className="containerName signIN">АВТОРИЗИРУЙСЯ</h1>
            <label className="labelInput loginSignIN">Логин:</label>
            <input className="loginInput userSignIN" type="text" ></input>
            <label className="labelInput passwordSignIN">Пароль:</label>
            <input className="loginInput passSignIN" type="password"></input>
            <button className="loginButtonSignIN">Войти</button>
        </div>
    </>
}

export default SignIn;