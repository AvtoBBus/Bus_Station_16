import { useState } from "react"
import "./style/blockEmailOn.css"


const BlockEmailOn = (props) => {

    const [emailSetting, setEmailSetting] = useState(false);
    const [userEmail, setUserEmail] = useState("");

    const emailSettingHandler = () => {
        setEmailSetting(!emailSetting);
    }

    const checkEmail = (email) => {
        const regex = new RegExp("([0-9a-zA-Z]{3,}|[0-9a-zA-Z\.]{3,})@[a-z]{2,}\.(ru|com)");
        if (email.match(regex) === null) {
            return false;
        }
        return true;
    }


    const saveHandler = () => {
        if (checkEmail(userEmail)) {
            console.log(userEmail);
        }
        else {
            alert("bad email");
        }
    }

    return <>
        <div className="blockEmailNottification">
            <input type="checkbox" name="boxSetting" className="boxSetting" onChange={emailSettingHandler} />
            <label for="boxSetting" className="settingText">Добавлять через почту</label>
        </div>
        {emailSetting ?
            <>
                <div className="emailInput">
                    <p className="userEmailText">Введите email с которого получать данные</p>
                    <input type="email" name="userEmail" className="userEmail" value={userEmail} onChange={(event) => setUserEmail(event.target.value)} />
                </div>
                <div>
                    <button className="saveSettingButton" onClick={saveHandler}>Сохранить</button>
                </div>
            </> : <></>}
    </>
}

export default BlockEmailOn;