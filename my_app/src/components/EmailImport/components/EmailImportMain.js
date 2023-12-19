import BlockEmailOn from "./BlockEmailOn";
import Instruction from "./Instruction";
import "./style/emailImportMain.css"


const EmailImportMain = (props) => {
    return <>
        <div className="emailImportMain">
            <BlockEmailOn />
            <Instruction />
        </div>
    </>
}

export default EmailImportMain;