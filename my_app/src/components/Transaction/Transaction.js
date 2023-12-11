import Footer from "../Home/footer/Footer"
import Header from "../Home/header/Header"
import SignOut from "../Home/main/components/SignOut"
import TransactionMainContent from "./components/TransactionMainContent"

const Transaction = (props) => {
        return <>
                <Header />
                <SignOut />
                <TransactionMainContent expList={props.expList} filterConverter={props.filterConverter} addItem={props.addElemInList} />
                <Footer />
        </>
}

export default Transaction