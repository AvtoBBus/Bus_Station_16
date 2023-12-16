import { useState } from "react";
import "./style/importMain.css"
import WarningContainer from "./WarningContainer"
import DragAndDropInput from "./DragAndDropInput";
import ShowUploadedFile from "./ShowUploadedFile"
import ButtonAddToList from "./ButtonAddToList"
import axios from "axios";
import { redirect } from "react-router-dom";


const ImportMain = (props) => {

    const [uploadedFile, setUploadedFile] = useState("");
    const [uploadedFileSize, setUploadedFileSize] = useState(0);

    const uploadFileHandler = (file) => {
        axios.interceptors.request.use(function (request) {
            console.log(request);
            return request;
        })
        setUploadedFileSize(Math.round(file.size / 1024));
        setUploadedFile(file.name);
        console.log(file);
        const reqData = new FormData();
        reqData.append("file", file)
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            axios.post(`http://localhost:5290/testController/UploadFile`, reqData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" }
                })
                .then(response => console.log(response))
        }


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
            <button className="buttonGetTable" onClick={(event) => { document.getElementById("inputFile").click(); }}>
                <input id="inputFile" type="file" accept=".txt,.xls,.xlsx,.csv" onChange={(event) => uploadFileHandler(event.target.files[0])} hidden />
                Загрузить excel-файл
            </button>
            <WarningContainer />
        </div>
    </>
}

export default ImportMain;