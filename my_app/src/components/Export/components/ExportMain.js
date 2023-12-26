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
        let end = new Date();
        let start = 0;

        if (currentDateRange === "Выбранный промежуток") {

            if (dateStart > dateEnd) {
                alert("ERROR!\nУКАЖИТЕ ПРАВИЛЬНУЮ ДАТУ НАЧАЛА И КОНЦА")
            }
            else {
                axios({
                    method: 'post',
                    url: `http://localhost:5290/userData/getAllBetweenDates`,
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                    data: JSON.stringify({
                        "startDate": dateStart,
                        "stopDate": dateEnd
                    })
                })
                    .then(response => console.log(response))
                    .catch(er => alert(er));
            }
        }
        else {

            if (currentDateRange === "Последняя неделя") {
                start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
            }
            else if (currentDateRange === "Последний месяц") {
                start = new Date();
                start = `${start.getFullYear()}-${start.getMonth()}-${start.getDate()}`
            }
            else if (currentDateRange === "Последний год") {
                start = new Date();
                start = `${start.getFullYear() - 1}-${start.getMonth() + 1}-${start.getDate()}`
            }
            axios({
                method: 'post',
                url: `http://localhost:5290/userData/getAllBetweenDates`,
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
                data: JSON.stringify({
                    "startDate": start,
                    "stopDate": `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`
                })

            })
                .then(response => console.log(response))
                .catch(er => alert(er));
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