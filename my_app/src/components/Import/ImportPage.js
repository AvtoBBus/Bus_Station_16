import Header from "../Home/header/Header"
import Footer from "../Home/footer/Footer"
import ImportMain from "./components/ImportMain"

const ImportPage = (props) => {
    return <>
        <Header />
        <ImportMain addElemsFromFile={props.addElemsFromFile} />
        <Footer />
    </>
}

export default ImportPage