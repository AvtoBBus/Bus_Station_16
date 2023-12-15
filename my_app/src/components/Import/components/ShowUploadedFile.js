import "./style/showUploadedFile.css"
import { useState } from "react";

const ShowUploadedFile = (props) => {

    function formatStr(input_str) {
        if (input_str.length >= 11)
            return input_str.slice(0, 10) + "..."
        return input_str
    }

    return <>
        <div className="showUploadedFileBlock">
            <div className="fileName">
                {String(props.uploadedFile).length === 0 ? "Empty" : formatStr(props.uploadedFile)}
            </div>
            <div className="fileSize">
                {props.uploadedFileSize}Kb
            </div>
        </div>
    </>
}

export default ShowUploadedFile;