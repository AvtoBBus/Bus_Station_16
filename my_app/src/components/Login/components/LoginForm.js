import SignUp from "./SignUp"
import SignIn from "./SignIn"
import "./style/loginForm.css"

const LoginForm = (props) => {

    const authHandlerSignUp = (userName) => {
        console.log("form");
        props.authHandler(userName);
    }

    return <>
        <label className="expensesLabel">EXPENSES</label>
        <div className="container">
            <SignUp authHandler={authHandlerSignUp} />
            <SignIn />
        </div>
    </>
}

export default LoginForm