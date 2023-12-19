import Footer from "../Home/footer/Footer";
import LoginForm from "./components/LoginForm";

const LoginPage = (props) => {

    const authHandlerSignUp = (userName) => {
        console.log(userName);
    }

    return <>
        <LoginForm authHandler={authHandlerSignUp} startReqDB={props.startGetList} />
        <Footer />
    </>
}

export default LoginPage;