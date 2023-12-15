import "./style/Footer.css"
import FooterCard from "./footerCard"
import GitHub_logo from "./data/img/GitHub_logo.png"
import AvtoBBus_img from "./data/img/AvtoBBus_img.jfif"
import Mestromezer_img from "./data/img/mestromezer_img.jfif"

const Footer = (props) => {
    const gitNames = [
        "AvtoBBus",
        "mestromezer"
    ]

    const gitLinks = [
        "https://github.com/AvtoBBus",
        "https://github.com/mestromezer"
    ]

    const imgPaths = [
        AvtoBBus_img,
        Mestromezer_img
    ]

    return <>
        <div className="footer">
            <div className="leftContent">
                Год создания:<br />
                2023
            </div>
            <div className="cardsContainer">
                <FooterCard creatorName={gitNames[0]} gitLink={gitLinks[0]} imgPath={imgPaths[0]} />
                <FooterCard creatorName={gitNames[1]} gitLink={gitLinks[1]} imgPath={imgPaths[1]} />
            </div>
            <div className="rightContent">
                GitHub repo:<br />
                <a href="https://github.com/AvtoBBus/Bus_Station_16">
                    <img className="gitHubLogo" src={GitHub_logo} />
                </a>
            </div>
        </div>
    </>
}

export default Footer;