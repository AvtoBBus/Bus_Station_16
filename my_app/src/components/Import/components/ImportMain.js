import { useState } from "react";
import "./style/importMain.css"
import WarningContainer from "./WarningContainer"
import DragAndDropInput from "./DragAndDropInput";
import ShowUploadedFile from "./ShowUploadedFile"
import ButtonAddToList from "./ButtonAddToList"


const ImportMain = (props) => {

    const [uploadedFile, setUploadedFile] = useState("");
    const [uploadedFileSize, setUploadedFileSize] = useState(0);

    const uploadFileHandler = (file) => {
        setUploadedFileSize(Math.round(file.size / 1024));
        setUploadedFile(file.name);
    }
    console.log(uploadedFile);

    const sendUploadedFile = () => {
        console.log("send");
    }

    return <>
        <div className="importMainContent">

            <DragAndDropInput uploadFile={uploadFileHandler} />
            <ShowUploadedFile uploadedFile={uploadedFile} uploadedFileSize={uploadedFileSize} />
            <ButtonAddToList sendFile={sendUploadedFile} />
            <button className="buttonGetTable" onClick={() => { document.getElementById("inputFile").click() }}>
                <input id="inputFile" type="file" accept=".xls,.xlsx,.csv" hidden />Загрузить excel-файл
            </button>
            <WarningContainer />
        </div>
    </>
}

export default ImportMain;