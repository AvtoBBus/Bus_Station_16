import { useState } from "react";
import "./style/importMain.css"
import WarningContainer from "./WarningContainer"

const ImportMain = (props) => {

    const [currentDateRange, setDateRange] = useState("Последняя неделя")


    const changeRangeHandler = (event) => {
        setDateRange(event.target.value);
    }

    return <>
        <div className="importMainContent">
            <div className="changeDateRangeContainer">
                <select className="changeDataRange" value={currentDateRange} onChange={changeRangeHandler}>
                    <option>Последняя неделя</option>
                    <option>Последний месяц</option>
                    <option>Последний год</option>
                    <option>Выбранный промежуток</option>
                </select>
                {currentDateRange === "Выбранный промежуток" ?
                    <div className="changeRange">
                        <p className="textInput start">Начало:</p>
                        <input type="date" className="dateInput from" />
                        <p className="textInput end">Конец:</p>
                        <input type="date" className="dateInput to" />
                    </div> :
                    <></>}
            </div>

            <button className="buttonGetTable">
                Получить excel-файл
            </button>


            <WarningContainer />

        </div>
    </>
}

export default ImportMain;