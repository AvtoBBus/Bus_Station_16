import { useState } from "react"
import "./style/expensesFilter.css"

const ExpensesFilter = (props) => {

    const [changedValue, setChangedValue] = useState("Фильтр");

    const currentOptionHandler = (event) => {
        setChangedValue(event.target.value);
        props.onChangeCurrentFilter(event.target.value);
    }

    const optionsId = Object.keys(props.filterConverter);
    const optionsValues = Object.values(props.filterConverter);
    let arrayFilterConverter = []

    for (let i = 0; i < optionsId.length; i++) {
        arrayFilterConverter.push([
            optionsId[i],
            optionsValues[i]
        ]);
    }

    return <>
        <select className="expensesFilter" value={props.value} onChange={currentOptionHandler} style={props.style}>
            {arrayFilterConverter.map((item) => {
                return (
                    <option key={item[1]} id={item[1]}>{item[0]}</option>
                )
            })}
        </select>
    </>
}

export default ExpensesFilter;