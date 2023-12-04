import "./style/buttonEditList.css"

const ButtonEditList = (props) => {

    const editListHandler = (event) => {
        event.preventDefault();
        props.switchEditFlag();
    }

    return <>
        <button className="buttonEditList" onClick={editListHandler}>
            Изменить список
        </button>
    </>
}

export default ButtonEditList;