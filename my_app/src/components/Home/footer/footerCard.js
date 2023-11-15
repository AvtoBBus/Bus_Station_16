import "./style/footerCard.css"

const FooterCard = (props) => {
    return <div className={"creatorCard @" + props.creatorName}>
        <img className="creatorImg" src={props.imgPath} />
        <div className="cardText">
            <div className="creatorName">{props.creatorName}</div>
            <a className="gitLink" href={props.gitLink}>GITHUB</a>
        </div>
    </div>

}

export default FooterCard;