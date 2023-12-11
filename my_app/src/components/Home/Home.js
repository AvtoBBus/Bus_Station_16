import Header from "./header/Header";
import MainContent from "./main/MainContent";
import Footer from "./footer/Footer";


const Home = (props) => {
    return <>
        <Header />
        <MainContent expList={props.expList} filterConverter={props.filterConverter} />
        <Footer />
    </>
}

export default Home;