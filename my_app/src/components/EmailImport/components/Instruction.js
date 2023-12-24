import "./style/instruction.css"

const Instruction = () => {
    return <>
        <div className="emailImportInstruction">
            <p className="instractionDesc">
                При включении параметра <p className="markDesc">"Добавлять через почту"</p>
                необходимо указать адрес электронной почты, с которой<br />
                вы будете отправлять чеки из магазинов.<br />
                Адрес для отправки чеков:<br />
                <p className="emailExp">expences_buffer@mail.ru</p>
                После отправки, данные из чека будут добавлены в список.<br /><br />
                Если они не появились, значит на данный момент формат чека не поддерживается.
            </p>
        </div>
    </>
}

export default Instruction;