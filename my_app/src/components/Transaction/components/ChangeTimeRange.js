import { useState } from "react";
import "./style/transactionMainContent.css"

const ChangeTimeRange = (props) => {



    return <>
        <div className="changeTimeText">
            Отобразить
        </div>
        <select className="changeTime" defaultValue={props.timeRange} onChange={(event) => props.changeTimeRangeHandler(event.target.value)}>
            <option>Все</option>
            <option>Последняя неделя</option>
            <option>Последний месяц</option>
            <option>Последние 3 месяца</option>
            <option>Последний год</option>
        </select>
    </>
}

export default ChangeTimeRange;