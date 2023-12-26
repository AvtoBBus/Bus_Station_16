import { Fade } from "react-reveal";
import "./style/instruction.css"
import { useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Instruction = () => {

    const [anim, setAnim] = useState(false);

    const clickEmailHandler = (event) => {
        setAnim(true);
        setTimeout(setAnim, 750, false);
    }

    return <>
        <div className="emailImportInstruction">
            <p className="instractionDesc">
                При включении параметра <p className="markDesc">"Добавлять через почту"</p>
                необходимо указать адрес электронной почты, с которой<br />
                вы будете отправлять чеки из магазинов.<br />
                Адрес для отправки чеков:<br />
                <CopyToClipboard text={"expences_buffer@mail.ru"} >
                    <p className="emailExp" onClick={clickEmailHandler}>expences_buffer@mail.ru</p>
                </CopyToClipboard>
                После отправки, данные из чека будут добавлены в список.<br /><br />
                Если они не появились, значит на данный момент формат чека не поддерживается.
            </p>
        </div>
        <Fade when={anim}>
            <div className="copiedText">Скопировано в буфер</div>
        </Fade>
    </>
}

export default Instruction;