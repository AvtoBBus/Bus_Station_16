import { useState } from "react";
import "./style/importMain.css"
import WarningContainer from "./WarningContainer"
import DragAndDropInput from "./DragAndDropInput";
import ShowUploadedFile from "./ShowUploadedFile"
import ButtonAddToList from "./ButtonAddToList"
import axios from "axios";


const ImportMain = (props) => {

    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadedFileSize, setUploadedFileSize] = useState(0);

    const uploadFileHandler = (file) => {
        setUploadedFileSize(Math.round(file.size / 1024));
        const formData = new FormData();
        formData.append(
            "myFile",
            file,
            file.name
        );
        setUploadedFile(formData);
    }

    const sendUploadedFile = () => {
        axios({
            method: 'post',
            url: ``,
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
            data: uploadedFile,
        })
            .then(response => console.log(response));
    }

    return <>
        <div className="importMainContent">

            <DragAndDropInput uploadFile={uploadFileHandler} />
            <ShowUploadedFile uploadedFile={uploadedFile ? uploadedFile.get("myFile").name : null} uploadedFileSize={uploadedFileSize} />
            <ButtonAddToList sendFile={sendUploadedFile} />
            <button className="buttonGetTable" onClick={(event) => { document.getElementById("inputFile").click(); }}>
                <input id="inputFile" type="file" accept=".txt,.xls,.xlsx,.csv" onChange={(event) => uploadFileHandler(event.target.files[0])} hidden />
                Загрузить excel-файл
            </button>
            <WarningContainer />
        </div>
    </>
}

export default ImportMain;