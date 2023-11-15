import Footer from "../Home/footer/Footer";
import LoginForm from "./components/LoginForm";
import { Navigate } from "react-router-dom";

const LoginPage = () => {

    const authHandlerSignUp = (userName) => {
        console.log(userName);
    }

    return <>
        <LoginForm authHandler={authHandlerSignUp} />
        <Footer />
    </>
}

export default LoginPage;