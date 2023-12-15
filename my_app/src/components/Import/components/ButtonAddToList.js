import "./style/buttonAddToList.css"

const ButtonAddToList = (props) => {

    const sendFileHandler = (event) => {
        event.preventDefault();
        props.sendFile();
    }


    return <>
        <button className="sendUploadedFile" onClick={sendFileHandler}>Отправить</button>
    </>
}

export default ButtonAddToList;