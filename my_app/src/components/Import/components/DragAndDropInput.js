import { useState } from "react";
import "./style/dragAndDropInput.css"
import axios from "axios";

const DragAndDropInput = (props) => {

    const [onDrag, setOnDrag] = useState(false);

    const dragStartHandler = (event) => {
        event.preventDefault();
        setOnDrag(true);
    }


    const dragStartEnd = (event) => {
        event.preventDefault();
        setOnDrag(false);
    }

    const onDropHandler = (event) => {
        event.preventDefault();
        console.log(event.dataTransfer.files[0])
        const reqData = new FormData(event.dataTransfer.files);
        axios({
            method: "POST",
            url: `http://localhost:5290//testCnotroller/UploadFile`,
            withCredentials: true,
            data: reqData,
        })
        props.uploadFile(event.dataTransfer.files[0])
        setOnDrag(false);
    }

    return <>
        <div className="dragAndDropZone">
            {
                onDrag ?
                    <div onDragStart={event => dragStartHandler(event)}
                        onDragLeave={event => dragStartEnd(event)}
                        onDragOver={event => dragStartHandler(event)}
                        onDrop={event => onDropHandler(event)}
                        className="dnd dropFile">Отпустите файл</div>
                    :
                    <div
                        onDragStart={event => dragStartHandler(event)}
                        onDragLeave={event => dragStartEnd(event)}
                        onDragOver={event => dragStartHandler(event)}
                        className="dnd dragFile">Перетащите файл</div>
            }
        </div>
    </>
}

export default DragAndDropInput;