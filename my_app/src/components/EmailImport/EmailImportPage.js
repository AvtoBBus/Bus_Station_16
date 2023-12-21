import Header from "../Home/header/Header";
import Footer from "../Home/footer/Footer";
import EmailImportMain from "./components/EmailImportMain"


const EmailImportPage = (props) => {
    return <>
        <Header />
        <EmailImportMain userEmail={props.userEmail} />
        <Footer />
    </>
}

export default EmailImportPage;