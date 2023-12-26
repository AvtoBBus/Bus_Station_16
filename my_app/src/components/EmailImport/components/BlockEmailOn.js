import { useState } from "react"
import "./style/blockEmailOn.css"
import Fade from "react-reveal/Fade"
import axios from "axios";
import checkedImage from "./data/img/checked.png"

const BlockEmailOn = (props) => {

    const [emailSetting, setEmailSetting] = useState(props.userEmail.length === 0 ? false : true);
    const [userEmail, setUserEmail] = useState(props.userEmail);

    const [anim, setAnim] = useState(false);

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
        let emailToSend = "";
        if (checkEmail(userEmail)) {
            if (!emailSetting) {
                emailToSend = "";
            }
            else {
                emailToSend = `?email=${userEmail}`;
            }
            axios({
                method: 'post',
                url: `http://localhost:5290/setEmail${emailToSend}`,
                withCredentials: true
            })
                .then(response => {
                    if (response.status === 201) {
                        setAnim(true);
                        setTimeout(setAnim, 1500, false);
                    }
                })
                .catch(error => alert(error))
        }
        else {
            alert("bad email");
        }
    }

    return <>
        <div className="blockEmailNottification">
            <input type="checkbox" name="boxSetting" className="boxSetting" onChange={emailSettingHandler} checked={emailSetting} />
            <label for="boxSetting" className="settingText">Добавлять через почту</label>
        </div>
        {emailSetting ?
            <>
                <div className="emailInput">
                    <p className="userEmailText">Введите email с которого получать данные</p>
                    <input type="email" name="userEmail" className="userEmail" value={userEmail} onChange={(event) => setUserEmail(event.target.value)} />
                </div>
            </> : <></>}
        <Fade left when={anim}>
            <img className="imgChecked" src={checkedImage} />
        </Fade>
        <div>
            <button className="saveSettingButton" onClick={saveHandler}>Сохранить</button>
        </div>
    </>
}

export default BlockEmailOn;