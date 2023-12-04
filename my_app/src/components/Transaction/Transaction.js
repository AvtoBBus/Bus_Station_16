import Footer from "../Home/footer/Footer"
import Header from "../Home/header/Header"
import SignOut from "../Home/main/components/SignOut"
import TransactionMainContent from "./components/TransactionMainContent"

const Transaction = (props) => {
    return <>
        <Header />
        <SignOut />
<<<<<<< Updated upstream
        <TransactionMainContent expList={props.expList} />
=======
        <TransactionMainContent expList={props.expList} deleteElemByIndex={props.deleteElemByIndex} addElemInList={props.addElemInList} filterConverter={props.filterConverter} />
>>>>>>> Stashed changes
        <Footer />
    </>
}

export default Transaction