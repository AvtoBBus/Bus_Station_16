import "./style/headerCard.css"

const HeaderCard = (props) => {
    return <>
        <div className={"headerCard " + props.className}>
            {props.text}
        </div>
    </>
}

export default HeaderCard;