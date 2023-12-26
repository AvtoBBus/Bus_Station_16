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
        if (!file) {
            alert("Something went wrong!\nTry later");
            return;
        }
        setUploadedFileSize(Math.round(file.size / 1024));
        const formData = new FormData();
        formData.append(
            "file",
            file
        );
        setUploadedFile(formData);
    }

    const sendUploadedFile = async () => {
        try {
            const resp = await axios.post(`http://localhost:5290/userData/import`, uploadedFile, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (resp.status !== 200) {
                alert("Something went wrong!\nTry later");
            }
            else {
                console.log(resp.data);
                props.addElemsFromFile(resp.data);
            }
        }
        catch (er) {
            alert("Something went wrong!\nTry later");
        }
    }

    return <>
        <div className="importMainContent">

            <DragAndDropInput uploadFile={uploadFileHandler} />
            <ShowUploadedFile uploadedFile={uploadedFile ? uploadedFile.get("file").name : null} uploadedFileSize={uploadedFileSize} />
            <ButtonAddToList sendFile={sendUploadedFile} />
            <button className="buttonGetTable" onClick={(event) => { document.getElementById("inputFile").click(); }}>
                <input id="inputFile" type="file" accept=".xls,.xlsx,.csv" onChange={(event) => uploadFileHandler(event.target.files[0])} hidden />
                Загрузить excel-файл
            </button>
            <WarningContainer />
        </div>
    </>
}

export default ImportMain;