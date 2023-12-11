import { useState } from "react";
import "./style/exportMain.css"
import WarningContainer from "./WarningContainer"
import axios from "axios"

const ExportMain = (props) => {

    let defaultDate = new Date;
    defaultDate = `${defaultDate.getFullYear()}-${defaultDate.getMonth() + 1}-${defaultDate.getDate()}`;


    const [currentDateRange, setDateRange] = useState("Последняя неделя")
    const [dateStart, setDateStart] = useState(defaultDate)
    const [dateEnd, setDateEnd] = useState(defaultDate)

    const changeRangeHandler = (event) => {
        setDateRange(event.target.value);
    }

    const changeDateStartHandler = (event) => {
        setDateStart(event.target.value);
    }


    const changeDateEndHandler = (event) => {
        setDateEnd(event.target.value);
    }

    const getTableHandler = (event) => {
        event.preventDefault();

        if (dateStart > dateEnd) {
            alert("ERROR!\nУКАЖИТЕ ПРАВИЛЬНУЮ ДАТУ НАЧАЛА И КОНЦА")
        }
        else {
            axios({
                method: 'post',
                url: `...endpoint...`,
                withCredentials: true,
                data: JSON.stringify({
                    "start": dateStart,
                    "end": dateEnd
                })
            })
        }
    }

    return <>
        <div className="exportMainContent">
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
                        <input type="date" className="dateInput from" onChange={changeDateStartHandler} value={dateStart} />
                        <p className="textInput end">Конец:</p>
                        <input type="date" className="dateInput to" onChange={changeDateEndHandler} value={dateEnd} />
                    </div> :
                    <></>}
            </div>

            <button className="buttonGetTable" onClick={getTableHandler}>
                Получить excel-файл
            </button>


            <WarningContainer />

        </div>
    </>
}

export default ExportMain