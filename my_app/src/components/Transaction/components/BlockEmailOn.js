import { useState } from "react"
import "./style/blockEmailOn.css"


const BlockEmailOn = (props) => {

    const [emailSetting, setEmailSetting] = useState(false);

    const emailSettingHandler = () => {
        setEmailSetting(!emailSetting);
    }

    return <>
        <div className="blockEmailNottification">
            <input type="checkbox" name="boxSetting" className="boxSetting" onChange={emailSettingHandler} />
            <label for="boxSetting" className="settingText">Добавлять<br />через почту</label>
            {emailSetting ?
                <div className="emailInput">
                    <label for="userEmail" className="userEmailText">Введите email с<br />которого получать данные</label>
                    <input type="email" name="userEmail" className="userEmail" />
                </div> : <></>}
        </div>
    </>
}

export default BlockEmailOn;